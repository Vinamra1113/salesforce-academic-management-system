import { LightningElement, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { refreshApex } from '@salesforce/apex';
import getFacultyAnnouncements from '@salesforce/apex/AnnouncementMakerController.getFacultyAnnouncements';
import getAnnouncementTypes from '@salesforce/apex/AnnouncementMakerController.getAnnouncementTypes';
import createAnnouncement from '@salesforce/apex/AnnouncementMakerController.createAnnouncement';

export default class AnnouncementMaker extends LightningElement {
    // Form properties
    titleValue = '';
    descriptionValue = '';
    typeValue = '';
    typeOptions = [];
    
    // Display properties
    recentAnnouncements = [];
    wiredAnnouncementsResult; // Property to hold the wired result for refreshApex
    isLoading = false;

    @wire(getFacultyAnnouncements)
    wiredAnnouncements(result) {
        this.wiredAnnouncementsResult = result;
        if (result.data) {
            this.recentAnnouncements = result.data;
        } else if (result.error) {
            this.showToast('Error', 'Could not load recent announcements.', 'error');
        }
    }

    @wire(getAnnouncementTypes)
    wiredTypes({ error, data }) {
        if (data) {
            this.typeOptions = data;
            // Set a default value if available
            if (data.length > 0) {
                this.typeValue = data[0].value;
            }
        }
    }

    handleInputChange(event) {
        const field = event.target.name;
        if (field === 'title') {
            this.titleValue = event.target.value;
        } else if (field === 'description') {
            this.descriptionValue = event.target.value;
        } else if (field === 'type') {
            this.typeValue = event.detail.value;
        }
    }

    handlePostClick() {
        if (!this.validateInput()) {
            this.showToast('Incomplete', 'Please fill out all required fields.', 'warning');
            return;
        }

        this.isLoading = true;
        createAnnouncement({
            title: this.titleValue,
            description: this.descriptionValue,
            type: this.typeValue
        })
        .then(() => {
            this.showToast('Success', 'Your announcement has been posted!', 'success');
            this.resetForm();
            // Refresh the list of recent announcements
            return refreshApex(this.wiredAnnouncementsResult);
        })
        .catch(error => {
            this.showToast('Error', error.body.message, 'error');
        })
        .finally(() => {
            this.isLoading = false;
        });
    }

    validateInput() {
        return this.titleValue && this.descriptionValue && this.typeValue;
    }

    resetForm() {
        this.titleValue = '';
        this.descriptionValue = '';
    }

    get noAnnouncements() {
        return this.recentAnnouncements.length === 0;
    }

    showToast(title, message, variant) {
        this.dispatchEvent(new ShowToastEvent({ title, message, variant }));
    }
}