import { LightningElement,track } from 'lwc';
 
export default class checkbox extends LightningElement {
 
    value = 'first'; //checkbox selected value
    @track integrationVal = true; //track checkbox values
    @track salesforceLWCVal = true; //track checkbox values
    @track auraComponentVal = true; //track checkbox values

    // checkbox values
    get options() {
        return [
            { label: 'Salesforce Integration', value: 'first' },
            { label: 'Salesforce LWC', value: 'second' },
            { label: 'Aura Component', value: 'third' },
        ];
    }
    
    // onclick on checkbox
    checkboxhandle(event) { 
        this.value = event.detail.value;        
        //alert('value!!! ' + this.value);
        if (this.value == 'first'){
            this.integrationVal = true;
        }else{
            this.integrationVal = false;
        }
       
        if (this.value == 'second'){
            this.salesforceLWCVal = true;
        }else{
            this.salesforceLWCVal = false;
        }
        
        if (this.value == 'third'){
            this.auraComponentVal = true;
        }else{
            this.auraComponentVal = false;
        }
    }
 
}