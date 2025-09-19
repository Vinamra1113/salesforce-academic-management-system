public with sharing class AttendanceViewController {

    /**
     * @description Fetches all subjects to populate the filter dropdown.
     */
    @AuraEnabled(cacheable=true)
    public static List<Subject__c> getSubjects() {
        try {
            return [SELECT Id, Name FROM Subject__c ORDER BY Name];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    /**
     * @description Fetches attendance records based on optional filter criteria.
     */
    @AuraEnabled(cacheable=false)
    public static List<Attendance__c> getAttendanceRecords(Date filterDate, Id subjectId) {
        try {
            String query = 'SELECT Id, Name, Date__c, Status__c, Student__r.Name, Subject__r.Name ' +
                           'FROM Attendance__c';
            
            List<String> whereClauses = new List<String>();
            
            // Add date filter
            if (filterDate != null) {
                whereClauses.add('Date__c = :filterDate');
            }

            // Add subject filter
            if (subjectId != null) {
                whereClauses.add('Subject__c = :subjectId');
            }
            
            // Combine WHERE clauses if any exist
            if (!whereClauses.isEmpty()) {
                query += ' WHERE ' + String.join(whereClauses, ' AND ');
            }
            
            query += ' ORDER BY Date__c DESC, CreatedDate DESC LIMIT 200';
            
            return Database.query(query);

        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}