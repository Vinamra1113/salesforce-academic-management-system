public with sharing class AttendanceController {

    // Wrapper updated to use a String for status
    public class AttendanceWrapper {
        @AuraEnabled public Id studentId { get; set; }
        @AuraEnabled public String studentName { get; set; }
        @AuraEnabled public String rollNumber { get; set; }
        @AuraEnabled public String status { get; set; } // Changed from isPresent
        @AuraEnabled public Id attendanceId { get; set; }
        @AuraEnabled public Date attendanceDate { get; set; }
        @AuraEnabled public Id subjectId { get; set; }
    }

    public class HistoryWrapper {
        @AuraEnabled public Date attendanceDate { get; set; }
        @AuraEnabled public Integer presentCount { get; set; }
        @AuraEnabled public Integer absentCount { get; set; }
    }

    /**
     * @description Gets the picklist values for the Status field on the Attendance object.
     * @return List<Map<String, String>> A list of label-value pairs for the picklist.
     */
    @AuraEnabled(cacheable=true)
    public static List<Map<String, String>> getAttendanceStatusOptions() {
        List<Map<String, String>> options = new List<Map<String, String>>();
        Schema.DescribeFieldResult fieldResult = Attendance__c.Status__c.getDescribe();
        List<Schema.PicklistEntry> ple = fieldResult.getPicklistValues();
        for (Schema.PicklistEntry p : ple) {
            options.add(new Map<String, String>{'label' => p.getLabel(), 'value' => p.getValue()});
        }
        return options;
    }

    @AuraEnabled(cacheable=true)
    public static List<AttendanceWrapper> getStudentsForAttendance(Date selectedDate, Id subjectId) {
        if (subjectId == null || selectedDate == null) {
            throw new AuraHandledException('Subject and Date are required.');
        }

        Map<Id, AttendanceWrapper> studentWrapperMap = new Map<Id, AttendanceWrapper>();

        for (Student__c student : [SELECT Id, Name, Roll_Number__c FROM Student__c ORDER BY Roll_Number__c]) {
            AttendanceWrapper wrapper = new AttendanceWrapper();
            wrapper.studentId = student.Id;
            wrapper.studentName = student.Name;
            wrapper.rollNumber = student.Roll_Number__c;
            wrapper.status = 'Absent'; // Default status
            studentWrapperMap.put(student.Id, wrapper);
        }

        for (Attendance__c att : [
            SELECT Id, Status__c, Student__c FROM Attendance__c
            WHERE Date__c = :selectedDate AND Subject__c = :subjectId AND Student__c IN :studentWrapperMap.keySet()
        ]) {
            if (studentWrapperMap.containsKey(att.Student__c)) {
                AttendanceWrapper wrapper = studentWrapperMap.get(att.Student__c);
                wrapper.attendanceId = att.Id;
                wrapper.status = att.Status__c;
            }
        }
        return studentWrapperMap.values();
    }

    @AuraEnabled
    public static String saveAttendance(String attendanceDataJSON) {
        try {
            List<AttendanceWrapper> wrappers = (List<AttendanceWrapper>) JSON.deserialize(attendanceDataJSON, List<AttendanceWrapper>.class);
            List<Attendance__c> recordsToUpsert = new List<Attendance__c>();

            for (AttendanceWrapper wrap : wrappers) {
                Attendance__c att = new Attendance__c();
                if (wrap.attendanceId != null) {
                    att.Id = wrap.attendanceId;
                }
                att.Student__c = wrap.studentId;
                att.Subject__c = wrap.subjectId;
                att.Date__c = wrap.attendanceDate;
                att.Status__c = wrap.status; // Directly use the status string
                recordsToUpsert.add(att);
            }

            if (!recordsToUpsert.isEmpty()) {
                upsert recordsToUpsert;
            }
            return 'Success';
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    // getSubjects() and getAttendanceHistory() methods remain unchanged...
    @AuraEnabled(cacheable=true)
    public static List<Subject__c> getSubjects() {
        return [SELECT Id, Name FROM Subject__c ORDER BY Name];
    }

    @AuraEnabled(cacheable=true)
    public static List<HistoryWrapper> getAttendanceHistory(Id subjectId) {
        if(subjectId == null) { return new List<HistoryWrapper>(); }
        Map<Date, HistoryWrapper> historyMap = new Map<Date, HistoryWrapper>();
        for(AggregateResult ar : [
            SELECT Date__c dt, Status__c st, COUNT(Id) c FROM Attendance__c
            WHERE Subject__c = :subjectId GROUP BY Date__c, Status__c ORDER BY Date__c DESC LIMIT 50
        ]) {
            Date attendanceDate = (Date)ar.get('dt');
            String status = (String)ar.get('st');
            Integer count = (Integer)ar.get('c');
            HistoryWrapper hw = historyMap.get(attendanceDate);
            if (hw == null) {
                hw = new HistoryWrapper();
                hw.attendanceDate = attendanceDate;
                hw.presentCount = 0;
                hw.absentCount = 0;
                historyMap.put(attendanceDate, hw);
            }
            if (status == 'Present') { hw.presentCount = count; } 
            else if (status == 'Absent') { hw.absentCount = count; }
        }
        return historyMap.values();
    }
}