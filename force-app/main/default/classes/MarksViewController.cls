public with sharing class MarksViewController {

    // Helper class for returning picklist values to LWC
    public class PicklistOption {
        @AuraEnabled public String label { get; set; }
        @AuraEnabled public String value { get; set; }
        public PicklistOption(String label, String value) {
            this.label = label;
            this.value = value;
        }
    }

    @AuraEnabled(cacheable=true)
    public static List<Subject__c> getSubjects() {
        try {
            return [SELECT Id, Name FROM Subject__c ORDER BY Name];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    // NEW: Fetches Exam Type picklist values dynamically
    @AuraEnabled(cacheable=true)
    public static List<PicklistOption> getExamTypes() {
        List<PicklistOption> options = new List<PicklistOption>();
        try {
            Schema.DescribeFieldResult fieldResult = Marks__c.Exam_Type__c.getDescribe();
            List<Schema.PicklistEntry> picklistEntries = fieldResult.getPicklistValues();
            for (Schema.PicklistEntry entry : picklistEntries) {
                options.add(new PicklistOption(entry.getLabel(), entry.getValue()));
            }
            return options;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    // REVISED: Fetches marks based on Subject and optional Exam Type
    @AuraEnabled(cacheable=false)
    public static List<Marks__c> getMarksBySubjectAndExam(Id subjectId, String examType) {
        if (subjectId == null) {
            return new List<Marks__c>();
        }
        try {
            String query = 'SELECT Student__r.Name, Student__r.Roll_Number__c, Marks_Obtained__c, Maximum_Marks__c, Exam_Type__c ' +
                           'FROM Marks__c';
            
            List<String> whereClauses = new List<String>();
            whereClauses.add('Subject__c = :subjectId');

            if (String.isNotBlank(examType)) {
                whereClauses.add('Exam_Type__c = :examType');
            }
            
            query += ' WHERE ' + String.join(whereClauses, ' AND ');
            query += ' ORDER BY Student__r.Name';
            
            return Database.query(query);

        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}