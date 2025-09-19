import { LightningElement, wire, track } from 'lwc';
import getSubjects from '@salesforce/apex/AttendanceViewController.getSubjects';
import getAttendanceRecords from '@salesforce/apex/AttendanceViewController.getAttendanceRecords';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

const COLUMNS = [
    { label: 'Date', fieldName: 'Date__c', type: 'date-local', sortable: true },
    { label: 'Student', fieldName: 'StudentName', type: 'text', sortable: true },
    { label: 'Subject', fieldName: 'SubjectName', type: 'text', sortable: true },
    { label: 'Status', fieldName: 'Status__c', type: 'text', cellAttributes: { class: { fieldName: 'statusClass' } } }
];

export default class AttendanceView extends LightningElement {
    columns = COLUMNS;
    @track data = [];
    @track subjectOptions = [];
    
    // Filter properties
    subjectFilter = '';
    dateFilter = null;

    isLoading = true;

    // Wire service to fetch the list of subjects
    @wire(getSubjects)
    wiredSubjects({ error, data }) {
        if (data) {
            this.subjectOptions = data.map(subject => ({
                label: subject.Name,
                value: subject.Id
            }));
        } else if (error) {
            this.showToast('Error', 'Could not load subject list.', 'error');
        }
    }
    
    connectedCallback() {
        this.loadAttendanceData();
    }

    loadAttendanceData() {
        this.isLoading = true;
        getAttendanceRecords({ 
            filterDate: this.dateFilter, 
            subjectId: this.subjectFilter
        })
        .then(result => {
            this.data = result.map(record => {
                let statusClass = record.Status__c === 'Present' ? 'slds-text-color_success' : 'slds-text-color_error';
                return {
                    ...record,
                    StudentName: record.Student__r.Name,
                    SubjectName: record.Subject__r.Name,
                    statusClass: statusClass
                };
            });
        })
        .catch(error => {
            this.showToast('Error', 'An error occurred while fetching attendance records.', 'error');
            this.data = [];
        })
        .finally(() => {
            this.isLoading = false;
        });
    }

    // --- HANDLER METHODS ---

    handleSubjectChange(event) {
        this.subjectFilter = event.detail.value;
    }

    handleDateChange(event) {
        this.dateFilter = event.target.value;
    }

    handleFilterClick() {
        this.loadAttendanceData();
    }

    handleClearClick() {
        this.subjectFilter = '';
        this.dateFilter = null;

        this.template.querySelectorAll('lightning-combobox, lightning-input').forEach(input => {
            input.value = null;
        });

        this.loadAttendanceData();
    }
    
    // --- UTILITY METHODS ---

    get noResults() {
        return !this.isLoading && this.data.length === 0;
    }

    showToast(title, message, variant) {
        this.dispatchEvent(new ShowToastEvent({ title, message, variant }));
    }
}