import { LightningElement, wire } from 'lwc';
import getSubjects from '@salesforce/apex/MarksViewController.getSubjects';
import getExamTypes from '@salesforce/apex/MarksViewController.getExamTypes';
import getMarksBySubjectAndExam from '@salesforce/apex/MarksViewController.getMarksBySubjectAndExam';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

const COLUMNS = [
    { label: 'Student Roll Number', fieldName: 'StudentRollNumber', type: 'text' },
    { label: 'Student Name', fieldName: 'StudentName', type: 'text' },
    { label: 'Marks Obtained', fieldName: 'Marks_Obtained__c', type: 'number', cellAttributes: { alignment: 'left' } },
    { label: 'Maximum Marks', fieldName: 'Maximum_Marks__c', type: 'number', cellAttributes: { alignment: 'left' } }
];

export default class MarksView extends LightningElement {
    subjectOptions = [];
    examTypeOptions = [];
    marksData = [];
    columns = COLUMNS;
    
    selectedSubjectId = null;
    selectedExamType = null;
    isLoading = false;

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
    
    @wire(getExamTypes)
    wiredExamTypes({ error, data }) {
        if (data) {
            this.examTypeOptions = data; // Apex already formats this as label/value
        } else if (error) {
            this.showToast('Error', 'Could not load exam types.', 'error');
        }
    }

    handleSubjectChange(event) {
        this.selectedSubjectId = event.detail.value;
        this.selectedExamType = null; // Reset exam type when subject changes
        this.loadMarksData();
    }
    
    handleExamTypeChange(event) {
        this.selectedExamType = event.detail.value;
        this.loadMarksData();
    }

    loadMarksData() {
        if (!this.selectedSubjectId) {
            return;
        }
        
        this.isLoading = true;
        getMarksBySubjectAndExam({ 
            subjectId: this.selectedSubjectId, 
            examType: this.selectedExamType 
        })
        .then(result => {
            this.marksData = result.map(mark => ({
                ...mark,
                StudentName: mark.Student__r.Name,
                StudentRollNumber: mark.Student__r.Roll_Number__c
            }));
        })
        .catch(error => {
            console.error('Error fetching marks:', error);
            this.showToast('Error', 'An error occurred while fetching marks.', 'error');
        })
        .finally(() => {
            this.isLoading = false;
        });
    }

    handleClearClick() {
        this.selectedSubjectId = null;
        this.selectedExamType = null;
        this.marksData = [];
    }

    // --- GETTERS ---
    get isExamTypeFilterDisabled() {
        return !this.selectedSubjectId;
    }
    
    get isClearButtonDisabled() {
        return !this.selectedSubjectId;
    }

    get showResults() {
        return this.selectedSubjectId;
    }

    get noMarksFound() {
        return !this.isLoading && this.marksData.length === 0;
    }

    // --- UTILITY ---
    showToast(title, message, variant) {
        this.dispatchEvent(new ShowToastEvent({ title, message, variant }));
    }
}