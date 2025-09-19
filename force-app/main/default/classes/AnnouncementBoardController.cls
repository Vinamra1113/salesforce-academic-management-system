public with sharing class AnnouncementBoardController {

    @AuraEnabled(cacheable=true)
    public static List<Announcement__c> getAnnouncements() {
        try {
            return [
                SELECT 
                    Id,
                    Name,           // Announcement Title
                    Description__c, // Message
                    Date__c,        // Formula Date
                    Type__c,
                    Posted_By__r.Name // Get the related Faculty's Name
                FROM Announcement__c
                ORDER BY CreatedDate DESC
                LIMIT 50
            ];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}