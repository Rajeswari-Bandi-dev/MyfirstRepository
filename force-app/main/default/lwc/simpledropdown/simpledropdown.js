import { LightningElement, track } from 'lwc';

export default class ComboboxBasic extends LightningElement {
//@track value = 'inProgress';

get options() {
    return [
             { label: 'New', value: 'new' },
             { label: 'In Progress', value: 'inProgress' },
             { label: 'Finished', value: 'finished' },
             { label: 'New', value: 'added' },
             { label: 'In Progress', value: 'removed' },
             { label: 'Finished', value: 'edited' },
             { label: 'New', value: 'clone' },
             { label: 'In Progress', value: 'delete' },
             { label: 'Finished', value: 'refresh' },
           ];
}

handleChange(event) {
        this.value = event.detail.value;
     }
}