public with sharing class AnnouncementMakerController {

    // Helper class for returning picklist values
    public class PicklistOption {
        @AuraEnabled public String label { get; set; }
        @AuraEnabled public String value { get; set; }
        public PicklistOption(String label, String value) {
            this.label = label;
            this.value = value;
        }
    }

    // CORRECTED: This method now finds the Faculty record by matching the user's email.
    private static Id getCurrentFacultyId() {
        String currentUserEmail = UserInfo.getUserEmail();
        Faculty__c[] facultyMembers = [SELECT Id FROM Faculty__c WHERE Email__c = :currentUserEmail LIMIT 1];
        
        if (facultyMembers.isEmpty()) {
            throw new AuraHandledException('Could not find a Faculty record with an email matching the current user.');
        }
        return facultyMembers[0].Id;
    }

    @AuraEnabled(cacheable=true)
    public static List<Announcement__c> getFacultyAnnouncements() {
        Id facultyId = getCurrentFacultyId();
        return [
            SELECT Name, Description__c, Date__c, Type__c 
            FROM Announcement__c 
            WHERE Posted_By__c = :facultyId 
            ORDER BY CreatedDate DESC 
            LIMIT 5
        ];
    }
    
    @AuraEnabled(cacheable=true)
    public static List<PicklistOption> getAnnouncementTypes() {
        List<PicklistOption> options = new List<PicklistOption>();
        Schema.DescribeFieldResult fieldResult = Announcement__c.Type__c.getDescribe();
        for (Schema.PicklistEntry entry : fieldResult.getPicklistValues()) {
            options.add(new PicklistOption(entry.getLabel(), entry.getValue()));
        }
        return options;
    }

    @AuraEnabled
    public static Announcement__c createAnnouncement(String title, String description, String type) {
        if (String.isBlank(title) || String.isBlank(description)) {
            throw new AuraHandledException('Title and Description are required.');
        }
        
        Id facultyId = getCurrentFacultyId();
        
        Announcement__c newAnnouncement = new Announcement__c(
            Name = title,
            Description__c = description,
            Type__c = type,
            Posted_By__c = facultyId
        );
        
        insert newAnnouncement;
        return newAnnouncement;
    }
}