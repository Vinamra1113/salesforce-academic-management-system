import { LightningElement, track, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { refreshApex } from '@salesforce/apex';
import getSubjects from '@salesforce/apex/AttendanceController.getSubjects';
import getStudentsForAttendance from '@salesforce/apex/AttendanceController.getStudentsForAttendance';
import getAttendanceHistory from '@salesforce/apex/AttendanceController.getAttendanceHistory';
import saveAttendance from '@salesforce/apex/AttendanceController.saveAttendance';

const HISTORY_COLUMNS = [
    { label: 'Date', fieldName: 'attendanceDate', type: 'date-local', typeAttributes: { month: 'short', day: '2-digit', year: 'numeric' } },
    { label: 'Present Count', fieldName: 'presentCount', type: 'number', cellAttributes: { alignment: 'center' } },
    { label: 'Absent Count', fieldName: 'absentCount', type: 'number', cellAttributes: { alignment: 'center' } },
];

export default class AttendanceTracker extends LightningElement {
    @track selectedDate = new Date().toISOString().slice(0, 10);
    @track selectedSubject;
    @track subjectOptions = [];

    @track students = [];
    allStudents = [];
    originalStudents = [];
    
    @track historyData = [];
    historyColumns = HISTORY_COLUMNS;
    wiredHistoryResult;

    isLoading = false;
    studentsLoaded = false;
    
    @track presentCount = 0;
    @track absentCount = 0;

    get totalStudents() {
        return this.allStudents.length;
    }

    @wire(getSubjects)
    wiredSubjects({ error, data }) {
        if (data) {
            this.subjectOptions = data.map(subject => ({ label: subject.Name, value: subject.Id }));
        }
    }

    @wire(getAttendanceHistory, { subjectId: '$selectedSubject' })
    wiredHistory(result) {
        this.wiredHistoryResult = result;
        if (result.data) { this.historyData = result.data; }
    }

    handleDateChange(event) { this.selectedDate = event.target.value; this.studentsLoaded = false; }
    handleSubjectChange(event) { this.selectedSubject = event.target.value; this.studentsLoaded = false; }

    processStudents(studentData) {
        return studentData.map(student => {
            const isPresent = student.status === 'Present';
            return {
                ...student,
                tileClass: isPresent ? 'tile present' : 'tile absent',
                iconName: isPresent ? 'utility:check' : 'utility:user'
            };
        });
    }

    handleLoadStudents() {
        if (!this.selectedSubject || !this.selectedDate) {
            this.showToast('Warning', 'Please select a date and a subject.', 'warning');
            return;
        }
        this.isLoading = true;
        getStudentsForAttendance({ selectedDate: this.selectedDate, subjectId: this.selectedSubject })
            .then(result => {
                const processed = this.processStudents(result);
                this.allStudents = [...processed];
                this.students = [...processed];
                this.originalStudents = JSON.parse(JSON.stringify(processed));
                this.studentsLoaded = true;
                this.calculateSummary();
            })
            .catch(error => { this.showToast('Error', 'Failed to load data. ' + error.body.message, 'error'); })
            .finally(() => { this.isLoading = false; });
    }

    handleSearch(event) {
        const searchTerm = event.target.value.toLowerCase();
        this.students = this.allStudents.filter(student =>
            student.rollNumber.toLowerCase().includes(searchTerm)
        );
    }

    handleTileClick(event) {
        const studentId = event.currentTarget.dataset.id;
        const updateStudentState = (student) => {
            if (student.studentId === studentId) {
                const newStatus = student.status === 'Present' ? 'Absent' : 'Present';
                const isPresent = newStatus === 'Present';
                return {
                    ...student,
                    status: newStatus,
                    tileClass: isPresent ? 'tile present' : 'tile absent',
                    iconName: isPresent ? 'utility:check' : 'utility:user'
                };
            }
            return student;
        };
        this.students = this.students.map(updateStudentState);
        this.allStudents = this.allStudents.map(updateStudentState);
        this.calculateSummary();
    }
    
    handleMarkAllPresent() {
        this.allStudents = this.allStudents.map(s => ({...s, status: 'Present'}));
        this.students = this.processStudents(this.students.map(s => ({...s, status: 'Present'})));
        this.allStudents = this.processStudents(this.allStudents);
        this.calculateSummary();
    }

    handleMarkAllAbsent() {
        this.allStudents = this.allStudents.map(s => ({...s, status: 'Absent'}));
        this.students = this.processStudents(this.students.map(s => ({...s, status: 'Absent'})));
        this.allStudents = this.processStudents(this.allStudents);
        this.calculateSummary();
    }

    handleReset() {
        this.allStudents = JSON.parse(JSON.stringify(this.originalStudents));
        this.students = JSON.parse(JSON.stringify(this.originalStudents));
        const searchInput = this.template.querySelector('lightning-input[type="search"]');
        if(searchInput) { searchInput.value = ''; }
        this.calculateSummary();
    }
    
    // --- THIS FUNCTION IS NOW CORRECTED ---
    handleSave() {
        this.isLoading = true;
        // This mapping step is crucial. It adds the date and subject to each student record before sending it to be saved.
        const recordsToSave = this.allStudents.map(s => {
            return {
                ...s, // Keep all the existing student data
                subjectId: this.selectedSubject,
                attendanceDate: this.selectedDate
            };
        });

        saveAttendance({ attendanceDataJSON: JSON.stringify(recordsToSave) })
            .then(() => {
                this.showToast('Success', 'Attendance saved successfully!', 'success');
                this.handleLoadStudents(); 
                return refreshApex(this.wiredHistoryResult);
            })
            .catch(error => { this.showToast('Error', 'Failed to save attendance. ' + error.body.message, 'error'); })
            .finally(() => { this.isLoading = false; });
    }

    calculateSummary() {
        this.presentCount = this.allStudents.filter(s => s.status === 'Present').length;
        this.absentCount = this.allStudents.filter(s => s.status !== 'Present').length;
    }

    showToast(title, message, variant) {
        this.dispatchEvent(new ShowToastEvent({ title, message, variant }));
    }
}