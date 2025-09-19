public with sharing class MarksController {

    public class MarksEntryWrapper {
        @AuraEnabled public Id studentId { get; set; }
        @AuraEnabled public String studentName { get; set; }
        @AuraEnabled public String rollNumber { get; set; }
        @AuraEnabled public Decimal marksObtained { get; set; }
        @AuraEnabled public Decimal maximumMarks { get; set; }
        @AuraEnabled public Id markId { get; set; }
        @AuraEnabled public List<Marks__c> recentMarks { get; set; }
    }

    @AuraEnabled(cacheable=true)
    public static List<Subject__c> getSubjects() {
        return [SELECT Id, Name FROM Subject__c ORDER BY Name];
    }

    @AuraEnabled(cacheable=true)
    public static List<Map<String, String>> getExamTypes() {
        List<Map<String, String>> options = new List<Map<String, String>>();
        Schema.DescribeFieldResult fieldResult = Marks__c.Exam_Type__c.getDescribe();
        for (Schema.PicklistEntry p : fieldResult.getPicklistValues()) {
            options.add(new Map<String, String>{'label' => p.getLabel(), 'value' => p.getValue()});
        }
        return options;
    }

    @AuraEnabled(cacheable=true)
    public static List<MarksEntryWrapper> getStudentsForMarksEntry(Id subjectId, String examType) {
        if (subjectId == null || String.isBlank(examType)) {
            throw new AuraHandledException('Subject and Exam Type are required.');
        }

        // --- THIS SECTION IS NOW UPDATED ---
        Marks__c dummyRecord = new Marks__c(Exam_Type__c = examType);
        // Use the new, recommended method for recalculating formulas
        Formula.recalculateFormulas(new List<Marks__c>{dummyRecord});
        Decimal maxMarksForExam = dummyRecord.Maximum_Marks__c;
        // --- END UPDATE ---

        Map<Id, MarksEntryWrapper> studentWrapperMap = new Map<Id, MarksEntryWrapper>();
        List<Student__c> allStudents = [SELECT Id, Name, Roll_Number__c FROM Student__c ORDER BY Roll_Number__c];

        for (Student__c student : allStudents) {
            MarksEntryWrapper wrapper = new MarksEntryWrapper();
            wrapper.studentId = student.Id;
            wrapper.studentName = student.Name;
            wrapper.rollNumber = student.Roll_Number__c;
            wrapper.maximumMarks = maxMarksForExam;
            wrapper.recentMarks = new List<Marks__c>();
            studentWrapperMap.put(student.Id, wrapper);
        }

        for (Marks__c mark : [
            SELECT Id, Marks_Obtained__c, Student__c
            FROM Marks__c
            WHERE Subject__c = :subjectId AND Exam_Type__c = :examType AND Student__c IN :studentWrapperMap.keySet()
        ]) {
            MarksEntryWrapper wrapper = studentWrapperMap.get(mark.Student__c);
            wrapper.marksObtained = mark.Marks_Obtained__c;
            wrapper.markId = mark.Id;
        }

        for (Marks__c recentMark : [
            SELECT Id, Exam_Type__c, Marks_Obtained__c, Maximum_Marks__c, Student__c
            FROM Marks__c
            WHERE Subject__c = :subjectId AND Exam_Type__c != :examType AND Student__c IN :studentWrapperMap.keySet()
            ORDER BY CreatedDate DESC
            LIMIT 250
        ]) {
            MarksEntryWrapper wrapper = studentWrapperMap.get(recentMark.Student__c);
            if (wrapper.recentMarks.size() < 5) {
                wrapper.recentMarks.add(recentMark);
            }
        }
        return studentWrapperMap.values();
    }

    @AuraEnabled(cacheable=true)
    public static List<Marks__c> getStudentMarks() {
        String currentUserEmail = UserInfo.getUserEmail();
        List<Student__c> students = [SELECT Id FROM Student__c WHERE Email__c = :currentUserEmail LIMIT 1];
        if (students.isEmpty()) { return new List<Marks__c>(); }
        Id studentId = students[0].Id;
        return [
            SELECT Id, Subject__r.Name, Exam_Type__c, Marks_Obtained__c, Maximum_Marks__c
            FROM Marks__c WHERE Student__c = :studentId ORDER BY CreatedDate DESC
        ];
    }
    
    @AuraEnabled
    public static String saveMarks(String marksDataJSON) {
        try {
            List<Marks__c> marksToUpsert = (List<Marks__c>) JSON.deserialize(marksDataJSON, List<Marks__c>.class);
            if (!marksToUpsert.isEmpty()) {
                upsert marksToUpsert;
            }
            return 'Success';
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}