import { LightningElement, track } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi'; //provides JavaScript APIs to create, delete, update, and refresh records.
import { ShowToastEvent } from 'lightning/platformShowToastEvent'; //provide feedback to user, remains 3 sec ,popup
import { NavigationMixin } from 'lightning/navigation'; // A component calls this API to navigate to another page in the application.
import CONTACT_OBJECT from '@salesforce/schema/Contact';
import contactFirstName from '@salesforce/schema/Contact.FirstName';
import contactLastName from '@salesforce/schema/Contact.LastName';
import contactPhone from '@salesforce/schema/Contact.Phone';
import contactEmail from '@salesforce/schema/Contact.Email';
import contactLeadSource from '@salesforce/schema/Contact.LeadSource';
import accountFieldId from '@salesforce/schema/Contact.AccountId';
 
export default class LwcCreateContactCustomLookup extends NavigationMixin(LightningElement) {   
    value = [];
    @track selectedAccountId;
    @track picklistval;
    @track contactId;    
    firstname = '';   
    lastname = '';  
    phoneNo = '';
    emailId = '';
    // indian = '';
    


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
                this.dispatchEvent( //firing an event
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Contact created successfully..!',
                        variant: 'success',
                    }),
                );
                // after creating new record navigate to the contact record page
                this[NavigationMixin.Navigate]({
                    type: 'standard__recordPage',
                    attributes: {
                        recordId: contactobj.id,
                        objectApiName: 'Contact',
                        actionName: 'view'
                    },
                });
 
 
            })
            .catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error Please enter the valid details',
                        message: error.body.message,
                        variant: 'error',
                    }),
                );
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

}