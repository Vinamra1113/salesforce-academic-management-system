import { LightningElement, wire } from 'lwc';
import getAnnouncements from '@salesforce/apex/AnnouncementBoardController.getAnnouncements';

export default class AnnouncementBoard extends LightningElement {
    announcements = [];
    error;
    isLoading = true;

    @wire(getAnnouncements)
    wiredAnnouncements({ error, data }) {
        if (data) {
            // "Flatten" the data to make it easier to access in the template
            this.announcements = data.map(record => {
                // Check if the related Faculty record and Name exist
                const facultyName = record.Posted_By__r ? record.Posted_By__r.Name : 'N/A';
                return {
                    ...record,
                    FacultyName: facultyName
                };
            });
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.announcements = [];
            console.error('Error loading announcements:', error);
        }
        this.isLoading = false;
    }
    
    // Getter to easily check if there are no announcements to show
    get noAnnouncements() {
        return !this.isLoading && this.announcements.length === 0;
    }
}