import { LightningElement, track } from  'lwc';
import accountclass from '@salesforce/apex/ContactController.ContactController';
export default class salesforce extends LightningElement {
   @track accountsList;
   @track showAccounts;
  
   onShowClickSalesforce(){
    accountclass()
       .then(result => {
               this.accountsList = result;
               this.showAccounts = true;
       })
       .catch(error => {
           console.log('Errorured:- '+error.body.message);
       });
   }
   onHideClickSalesforce(){
       this.showAccounts = false;
   }
}