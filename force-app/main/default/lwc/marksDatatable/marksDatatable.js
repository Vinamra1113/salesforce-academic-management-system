import LightningDatatable from 'lightning/datatable';
import inputTemplate from './inputTemplate.html';

export default class MarksDatatable extends LightningDatatable {
    static customTypes = {
        customNumberInput: {
            template: inputTemplate,
            standardCellLayout: true,
            typeAttributes: ['studentId'],
        }
    };

    // This captures the 'change' event from the input and dispatches our own custom event
    handleInputChange(event) {
        event.stopPropagation();
        
        const studentId = event.target.dataset.id;
        const marks = event.detail.value;

        this.dispatchEvent(new CustomEvent('markschange', {
            composed: true,
            bubbles: true,
            cancelable: true,
            detail: {
                studentId: studentId,
                marks: marks
            }
        }));
    }
}