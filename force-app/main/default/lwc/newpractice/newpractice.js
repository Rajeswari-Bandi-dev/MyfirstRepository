import { LightningElement, wire, api, track } from 'lwc';
 
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
 
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
 
import Contact_OBJECT from '@salesforce/schema/Contact';
 
import LeadSource_FIELD from '@salesforce/schema/Contact.LeadSource';
 
 
export default class newpractice extends LightningElement {
    LeadSourceval ='';
    Web= '';
    PhoneInquiry = '';
    PartnerReferral = '';
    PurchasedList = '';
    Other = '';

    // getting the default record type id, if you dont' then it will get master
    @wire(getObjectInfo, { objectApiName: Contact_OBJECT })
 
    contactMetadata;
 
    // now retriving the LeadSource picklist values of Contact
 
    @wire(getPicklistValues,
        {
            recordTypeId: '$contactMetadata.data.defaultRecordTypeId', 
            fieldApiName: LeadSource_FIELD
        }
    )

    ContactPicklist;
 
    // display the selected picklist value
    handleChange(event) {
 
        this.LeadSourceval = event.detail.value;
        this.picklistVal = this.LeadSourceval;
       if(this.picklistVal === 'Web'){
          this.Web = this.LeadSourceval ;
       }else{
        this.Web = '';
       }
 
       if(this.picklistVal === 'Phone Inquiry'){
         this.PhoneInquiry = this.LeadSourceval ;
         console.log(this.PhoneInquiry);
       }else{
        this.PhoneInquiry = '';
       }
 
       if(this.picklistVal === 'Partner Referral'){
          this.PartnerReferral = this.LeadSourceval ;
       }else{
        this.PartnerReferral = '';
       }
 
       if(this.picklistVal === 'Purchased List'){
        this.PurchasedList = this.LeadSourceval ;
     }else{
        this.PurchasedList = '';
     }
 
     if(this.picklistVal === 'Other'){
        this.Other = this.LeadSourceval ;
     }else{
        this.Other = '';
     }
      
    }
}