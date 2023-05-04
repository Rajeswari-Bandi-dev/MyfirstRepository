// RECORD FORM
// import { LightningElement,api } from 'lwc';

// export default class RecordViewDemo extends LightningElement {
//   @api objectApiName;
//   @api recordId;

//   convertlead(event){
//     // handle onclick event
//   }
// }

// // RECORD VIEW FORM
// import { LightningElement,api } from 'lwc';
// export default class RecordViewDemo extends LightningElement {
//     @api objectApiName;
//     @api recordId;

  //   showT̥ext = false;
  //   textValue = 'Lead is Converted';
  // convertlead(event){
  //   this.showText = true;
  // }

import { LightningElement,track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class formlead extends NavigationMixin(LightningElement)  {
  
  
  @track isShowModal = false;
  
  showModalBox() {  
      this.isShowModal = true;
  }
  hideModalBox() {  
    this.isShowModal = false;
}

  leadpage() {  
    this[NavigationMixin.Navigate]({
      type: 'standard__objectPage',
      attributes: {
          apiName: 'Lead'
          // apiName: this.Lead,
          // actionName: 'home'
      }
  });
  }
  
  
  url;
    connectedCallback() {
        this.accountHomePageRef = {
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Account',
                actionName: 'home'
            }
        };
        this[NavigationMixin.GenerateUrl](this.accountHomePageRef)
            .then(url => this.url = url);
    }
    accounttab(evt) {
        this[NavigationMixin.Navigate](this.accountHomePageRef);
    }

}