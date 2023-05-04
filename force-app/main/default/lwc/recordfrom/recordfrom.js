import { LightningElement, api, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import bootstrap from '@salesforce/resourceUrl/bootstrap'; //Import bootstrap from static resource.
// import jquery from '@salesforce/resourceUrl/jquery'; //import jquery
import { loadStyle, loadScript } from 'lightning/platformResourceLoader'; //Import methods from the platformResourceLoader module.

export default class recordfrom extends LightningElement {    
   // @api disabled = false; //account lookup
    @api value; //account lookup
    // @api required ; //account lookup
    // @api value = ''; //checkbox selected value
    // @track integrationVal = true; //track checkbox values
    // @track salesforceLWCVal = true; //track checkbox values
    // @track auraComponentVal = true; //track checkbox values
    // @track value = 'new'; //to track dowpdown values

    // rendering boostrap from file 
    renderedCallback() {
        Promise.all([
            loadScript(this, bootstrap + '/bootstrap-5.0.2-dist/js/bootstrap.js'),
            // bootstrap-5.0.2-dist\bootstrap-5.0.2-dist\js
            // loadScript(this, jquery),
            loadStyle(this, bootstrap + '/bootstrap-5.0.2-dist/css/bootstrap.min.css')
        ])
            .then(() => {
                console.log("boostrap working good.")
            })
            .catch(error => {
                console.log("failed to load the scripts");
            });
    }

    // account name lookup
    handleChange(event) {
        const selectedEvent = new CustomEvent('valueselected', {
            detail: event.detail.value
        });
        this.dispatchEvent(selectedEvent);
    }

    // account name lookup
    // @api isValid() {
    //     if (this.required) {
    //         this.template.querySelector('lightning-input-field').reportValidity();
    //     }
    // }

    // onclick on save button function
    handleSuccess(event) {
        const evt = new ShowToastEvent({
            title: "Contact created",
            message: "Record ID: " + event.detail.id,
            variant: "success"
        });
        this.dispatchEvent(evt);
    }

    // cancel button
    // handleCancel(){
    //     this.template.querySelector('form').reset();
    //   }

    // record edit form onclick
    // handleSuccess(event) {
    //     console.log('onsuccess event recordEditForm',event.detail.id)
    // }
    // handleSubmit(event) {
    //     console.log('onsubmit event recordEditForm'+ event.detail.fields);
    // }

}


    // checkbox values
    // get options() {
    //     return [
    //         { label: 'Kannada', value: 'first' },
    //         { label: 'English', value: 'second' },
    //         { label: 'Hindi', value: 'third' },
    //     ];
    // }
    
    // onclick on checkbox
    // checkboxhandle(event) { 
    //     this.value = event.detail.value;        
       
    //     if (this.value == 'first'){
    //         this.integrationVal = true;
    //     }else{
    //         this.integrationVal = false;
    //     }
       
    //     if (this.value == 'second'){
    //         this.salesforceLWCVal = true;
    //     }else{
    //         this.salesforceLWCVal = false;
    //     }
        
    //     if (this.value == 'third'){
    //         this.auraComponentVal = true;
    //     }else{
    //         this.auraComponentVal = false;
    //     }
    // }

    

    // single selection dropdown
    // get optionss() {
    // return [
    //          { label: 'New', value: 'new' },
    //          { label: 'In Progress', value: 'inProgress' },
    //          { label: 'Finished', value: 'finished' },
    //        ];
    // }

    // onselect dropdown
    // handledropdown(event) {
    //     this.value = event.detail.value;
    //  }






// -------------------------------------------------------------------------------------------------------------------------------------------------------------------


// import { LightningElement} from 'lwc';
// export default class RecordEditFormCreateExampleLWC extends LightningElement {
//     handleSuccess(event) {
//         console.log('onsuccess event recordEditForm',event.detail.id)
//     }
//     handleSubmit(event) {
//         console.log('onsubmit event recordEditForm'+ event.detail.fields);
//     }
// }


// import { LightningElement, api } from 'lwc';
// import { ShowToastEvent } from 'lightning/platformShowToastEvent';
// import NAME_FIELD from '@salesforce/schema/Account.Name';
// import Email from '@salesforce/schema/Contact.Email';
// import Mobile_FIELD from '@salesforce/schema/Contact.Phone';
// import AccountName_FIELD from '@salesforce/schema/Contact.AccountId';

// export default class LightningRecordFormCreateExampleLWC extends LightningElement {
//     @api objectApiName;
//     fields = [AccountName_FIELD, NAME_FIELD, Email, Mobile_FIELD,  ];
//     handleSuccess(event) {
//         const evt = new ShowToastEvent({
//             title: "Contact created",
//             message: "Record ID: " + event.detail.id,
//             variant: "success"
//         });
//         this.dispatchEvent(evt);
//     }
// }