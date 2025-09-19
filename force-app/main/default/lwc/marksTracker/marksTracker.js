import { LightningElement, api, wire, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getSubjects from '@salesforce/apex/MarksController.getSubjects';
import getExamTypes from '@salesforce/apex/MarksController.getExamTypes';
import getStudentsForMarksEntry from '@salesforce/apex/MarksController.getStudentsForMarksEntry';
import getStudentMarks from '@salesforce/apex/MarksController.getStudentMarks';
import saveMarks from '@salesforce/apex/MarksController.saveMarks';

// Datatable constants are no longer needed for the faculty view

const STUDENT_COLUMNS = [
    { label: 'Subject', fieldName: 'SubjectName', type: 'text' },
    { label: 'Exam Type', fieldName: 'Exam_Type__c', type: 'text' },
    { label: 'Marks Obtained', fieldName: 'Marks_Obtained__c', type: 'number', cellAttributes: { alignment: 'left' } },
    { label: 'Maximum Marks', fieldName: 'Maximum_Marks__c', type: 'number', cellAttributes: { alignment: 'left' } }
];

export default class MarksTracker extends LightningElement {
    @api isFacultyView = false;
    
    // Common properties
    isLoading = false;
    subjectOptions = [];
    examTypeOptions = [];

    // Faculty properties
    @track studentsForEntry = [];
    allStudentsForEntry = [];
    selectedSubject;
    selectedExamType;
    isModalOpen = false; // Note: Row actions are removed, so modal logic may need a new trigger if desired

    // Student properties
    @track studentMarks;
    studentColumns = STUDENT_COLUMNS;

    // Getter for template condition
    get hasStudentMarks() { return this.studentMarks && this.studentMarks.length > 0; }

    @wire(getSubjects)
    wiredSubjects({ error, data }) {
        if (data) { this.subjectOptions = data.map(sub => ({ label: sub.Name, value: sub.Id })); }
    }

    @wire(getExamTypes)
    wiredExamTypes({ error, data }) {
        if (data) { this.examTypeOptions = data; }
    }

    connectedCallback() {
        if (!this.isFacultyView) { this.loadStudentMarks(); }
    }

    loadStudentMarks() {
        this.isLoading = true;
        getStudentMarks()
            .then(result => {
                this.studentMarks = result.map(mark => ({ ...mark, SubjectName: mark.Subject__r ? mark.Subject__r.Name : 'N/A'}));
            })
            .catch(error => this.showToast('Error', 'Could not load student marks: ' + error.body.message, 'error'))
            .finally(() => this.isLoading = false);
    }
    
    handleFilterChange(event) {
        const { name, value } = event.target;
        if (name === 'subject') { this.selectedSubject = value; }
        else if (name === 'examType') { this.selectedExamType = value; }
    }

    handleLoadStudents() {
        if (!this.selectedSubject || !this.selectedExamType) {
            this.showToast('Warning', 'Please select a Subject and an Exam Type.', 'warning');
            return;
        }
        this.isLoading = true;
        getStudentsForMarksEntry({ subjectId: this.selectedSubject, examType: this.selectedExamType })
            .then(result => {
                this.allStudentsForEntry = result;
                this.studentsForEntry = result;
                if(result.length === 0) { this.showToast('Info', 'No students found to load.', 'info'); }
            })
            .catch(error => this.showToast('Error', 'Could not load students: ' + error.body.message, 'error'))
            .finally(() => this.isLoading = false);
    }

    handleSearch(event) {
        const searchTerm = event.target.value.toLowerCase();
        this.studentsForEntry = this.allStudentsForEntry.filter(student =>
            student.rollNumber.toLowerCase().includes(searchTerm)
        );
    }
    
    // NEW, more direct handler for the input fields
    handleMarksInputChange(event) {
        const studentId = event.target.dataset.id;
        const marks = event.target.value;
        const marksValue = marks === '' || marks === null ? null : parseFloat(marks);

        const updateMarks = (student) => {
            if (student.studentId === studentId) {
                return { ...student, marksObtained: marksValue };
            }
            return student;
        };

        this.studentsForEntry = this.studentsForEntry.map(updateMarks);
        this.allStudentsForEntry = this.allStudentsForEntry.map(updateMarks);
    }

    handleSaveMarks() {
        this.isLoading = true;
        const marksToSave = this.allStudentsForEntry
            .filter(student => student.marksObtained !== null && student.marksObtained !== undefined)
            .map(student => {
                return {
                    'sobjectType': 'Marks__c',
                    'Id': student.markId,
                    'Student__c': student.studentId,
                    'Subject__c': this.selectedSubject,
                    'Exam_Type__c': this.selectedExamType,
                    'Marks_Obtained__c': student.marksObtained
                };
            });

        if (marksToSave.length === 0) {
            this.showToast('Info', 'No new or updated marks to save.', 'info');
            this.isLoading = false;
            return;
        }
        
        saveMarks({ marksDataJSON: JSON.stringify(marksToSave) })
            .then(() => {
                this.showToast('Success', 'Marks saved successfully.', 'success');
                this.handleLoadStudents();
            })
            .catch(error => this.showToast('Error', 'Failed to save marks: ' + error.body.message, 'error'))
            .finally(() => this.isLoading = false);
    }

    showToast(title, message, variant) {
        const event = new ShowToastEvent({ title, message, variant });
        this.dispatchEvent(event);
    }
}