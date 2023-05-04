import { LightningElement, track } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi'; //provides JavaScript APIs to create, delete, update, and refresh records.
// import { ShowToastEvent } from 'lightning/platformShowToastEvent'; //provide feedback to user, remains 3 sec ,popup
import { NavigationMixin } from 'lightning/navigation'; // A component calls this API to navigate to another page in the application.
import CONTACT_OBJECT from '@salesforce/schema/Contact';
import contactFirstName from '@salesforce/schema/Contact.FirstName';
import contactLastName from '@salesforce/schema/Contact.LastName';
import contactPhone from '@salesforce/schema/Contact.Phone';
import contactEmail from '@salesforce/schema/Contact.Email';
import contactLeadSource from '@salesforce/schema/Contact.LeadSource';
import accountFieldId from '@salesforce/schema/Contact.AccountId';

import LightningAlert from "lightning/alert";
// import LightningPrompt from "lightning/prompt";
// import LightningConfirm from "lightning/confirm";
 
export default class openModal extends NavigationMixin(LightningElement) {   
    // @api onmodelvalue;
    value = [];
    @track isModalOpen = false; //tracking pop up model
    @track selectedAccountId;
    @track picklistval;
    @track contactId;    
    firstname = '';   
    lastname = '';  
    phoneNo = '';
    emailId = '';

    contactHandleChange(event) {
        console.log(event.target.label);
        console.log(event.target.value);        
        if(event.target.label=='First Name'){
            this.firstname = event.target.value;
        }
        if(event.target.label=='Last Name'){
            this.lastname = event.target.value;
        }   
        
        if(event.target.label=='Phone'){
            this.phoneNo = event.target.value;
        }
 
        if(event.target.label=='Email'){
            this.emailId = event.target.value;
        }
                   
    }
 
    createLookupContactAction(){
        console.log(this.selectedAccountId);
        console.log(this.picklistval);
        const fields = {};
        fields[contactFirstName.fieldApiName] = this.firstname;
        fields[contactLastName.fieldApiName] = this.lastname;
        fields[contactPhone.fieldApiName] = this.phoneNo;
        fields[contactEmail.fieldApiName] = this.emailId;
        fields[contactLeadSource.fieldApiName] = this.picklistval;
        
        fields[accountFieldId.fieldApiName] = this.selectedAccountId;

        const recordInput = { apiName: CONTACT_OBJECT.objectApiName, fields }; 
        createRecord(recordInput)
            .then(contactobj=> {
                this.contactId = contactobj.id;
                this.fields={};
                const childevent = new CustomEvent('modelvalue');
                this.dispatchEvent(childevent);
                // this.dispatchEvent( //firing an event
                // LightningAlert.open({
                //     message: "Record created succesfully",
                //     theme: "Success",
                //     label: "Success header"
                //   })
                //   .then(() => {
                //     // handlepopval();
                //     const childevent = new CustomEvent('modelvalue');
                //     this.dispatchEvent(childevent);
                //     console.log("###Alert Closed");
                    // this.isModalOpen = false;
                    // window.location.reload();
                //   }),
                // );
            })
                    .catch(error => {
                LightningAlert.open({
                    message: error.body.message,
                    theme: "error",
                    label: "Alert Header"
                  }).then(() => {
                    console.log("###Alert Closed");
                  });
            });
    }

    myLookupHandle(event){ //lookup field 
        console.log(event.detail);
        this.selectedAccountId = event.detail;
    }

    handlepicklist(event){
        console.log(event.detail.value);
        this.picklistval = event.detail.value;
        console.log(this.picklistval);
    }

    // openModal() {
    //     // to open modal set isModalOpen tarck value as true
    //     this.isModalOpen = true;
    // }

    closeModal() {
        const childevent = new CustomEvent('modelvalue');
        this.dispatchEvent(childevent);
    }

}