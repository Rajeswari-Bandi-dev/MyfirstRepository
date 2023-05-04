import { LightningElement, track } from 'lwc';
import saveresult from '@salesforce/apex/LWCAccountCreation.acct';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';


export default class CreateAccount extends LightningElement {
@track name;


handlechange(event)
{
    this.name=event.target.value;
}

handlesuccess(){
    saveresult({
        n: this.name
    }).then(response => {
        if (response == 'Success') {
            this.dispatchEvent(new ShowToastEvent({
                title: 'Success',
                message: 'Account Created Succesfully',
                variant: 'Success'
            }));
        } else{
            this.dispatchEvent(new ShowToastEvent({
                title: 'Error',
                message: 'Somethis went wrong',
                variant: 'error'
        }));
    }
}).catch(error => {
    console.log('error:', error);
}).finally(() => {
    this.isOpenSpinner = false;
});

}


}