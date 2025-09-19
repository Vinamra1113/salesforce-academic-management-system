import LightningDatatable from 'lightning/datatable';
import comboboxTemplate from './comboboxTemplate.html';

export default class AttendanceDatatable extends LightningDatatable {
    static customTypes = {
        customCombobox: {
            template: comboboxTemplate,
            standardCellLayout: true,
            typeAttributes: ['studentId', 'options'],
        }
    };

    // This handler listens for the 'change' event from the lightning-combobox
    handleComboboxChange(event) {
        event.stopPropagation();
        
        const studentId = event.target.dataset.id;
        const newStatus = event.detail.value;

        this.dispatchEvent(new CustomEvent('comboboxchange', {
            composed: true,
            bubbles: true,
            cancelable: true,
            detail: {
                studentId: studentId,
                status: newStatus
            }
        }));
    }
}