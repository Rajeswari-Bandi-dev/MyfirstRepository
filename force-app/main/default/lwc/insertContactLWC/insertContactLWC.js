import { LightningElement,track } from 'lwc';
import insertContactMethod from '@salesforce/apex/ContactApexController.insertContactMethod';
import contFirstName from '@salesforce/schema/Contact.FirstName';
import contLastName from '@salesforce/schema/Contact.LastName';
import contPhone from '@salesforce/schema/Contact.Phone';
import contEmail from '@salesforce/schema/Contact.Email';
import contTitle from '@salesforce/schema/Contact.Title';
import contBirthdate from '@salesforce/schema/Contact.Birthdate';
// import contAccountName from '@salesforce/schema/Contact.AccountId';
// import contFirstName from '@salesforce/schema/Contact.FirstName';

import {ShowToastEvent} from 'lightning/platformShowToastEvent';

export default class insertContactLWC extends LightningElement {
@track contactid;
@track error;
@track getContactRecord={
FirstName:contFirstName,
LastName:contLastName,
Phone:contPhone,
Email:contEmail,
Title:contTitle,
Birthdate:contBirthdate,
// AccountName:contAccountName,
// Phone:contPhone,
// Phone:contPhone,
};

FirstNameInpChange(event){
this.getContactRecord.FirstName = event.target.value;
//window.console.log(this.getAccountRecord.FirstName);
}

LastNameInpChange(event){
this.getContactRecord.LastName = event.target.value;
//window.console.log(this.getAccountRecord.LastName);
}

PhoneInpChange(event){
this.getContactRecord.Phone = event.target.value;
//window.console.log(this.getAccountRecord.Phone);
}

EmailInpChange(event){
this.getContactRecord.Email = event.target.value;
    //window.console.log(this.getAccountRecord.Email);
}

TitleInpChange(event){
    this.getContactRecord.Title = event.target.value;
//window.console.log(this.getAccountRecord.Type);
}

BirthdateInpChange(event){
    this.getContactRecord.Birthdate = event.target.value;
    //window.console.log(this.getAccountRecord.Birthdate);
}

// AccountNameInpChange(event){
//     this.getContactRecord.AccountName = event.target.value;
//     //window.console.log(this.getAccountRecord.AccountName);
// }

// PhoneInpChange(event){
//     this.getContactRecord.Phone = event.target.value;
//     //window.console.log(this.getAccountRecord.Type);
// }

// PhoneInpChange(event){
//     this.getContactRecord.Phone = event.target.value;
//     //window.console.log(this.getAccountRecord.Type);
// }

// handleAccountName() {
//     this.searchTerm = '';
//     this.inputClass = 'slds-has-focus';
//     this.boxClass = 'slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click slds-has-focus slds-is-open';
// }

saveContactAction(){
window.console.log('before save' + this.createContact);
insertContactMethod({contactObj:this.getContactRecord})
.then(result=>{
window.console.log(this.createContact);
this.getContactRecord={};
this.contactid=result.Id;
window.console.log('after save' + this.contactid);

const toastEvent = new ShowToastEvent({
title:'Success!',
message:'Contact created successfully',
variant:'success'
});
this.dispatchEvent(toastEvent);
})
.catch(error=>{
this.error=error.message;
window.console.log(this.error);
});
}


}