import { LightningElement,track } from 'lwc';
 
export default class ButtonMenuLwc extends LightningElement {
    
    @track valueisyes = false;
    @track valueisno = false;
    selectedItemValue;
    handleOnselect(event) {
        this.selectedItemValue = event.detail.value;
 
        if (this.selectedItemValue == 'Yes'){
            this.valueisyes = true;
        }else{
            this.valueisyes = false;
        }
       
        if (this.selectedItemValue == 'No'){
            this.valueisno = true;
        }else{
            this.valueisno = false;
        }
 
    }

   
    @track auraComponentVal = false;
    selectedqsnoneno;
    handleqsnoneno(event){
        this.selectedqsnoneno = event.detail.value;
 
        if (this.selectedqsnoneno == 'I certify that this loan IS NOT HMDA Reportable'){
            this.auraComponentVal = true;
        }else{
            this.auraComponentVal = false;
        }
    }

    
    @track secondvalueisno = false;
    selectedqsnoneyes;
    handleqsnoneyes(event){
        this.selectedqsnoneyes = event.detail.value;
 
        if (this.selectedqsnoneyes == 'Yes'){
            this.valueisno = true;
        }else{
            this.valueisno = false;
        }
       
        if (this.selectedqsnoneyes == 'No'){
            this.secondvalueisno = true;
        }else{
            this.secondvalueisno = false;
        }
    }

    
    @track ComponentVal = false;
    selectedqsntwono;
    handleqsntwono(event){        
        this.selectedqsntwono = event.detail.value;
 
        if (this.selectedqsntwono == 'If the loan is not a purchase, is any part of the loan/LOC satisfying and replacing a dwelling secured loan/LOC with at least one of the same borrowers?'){
            this.ComponentVal = true;
        }else{
            this.ComponentVal = false;
        }
    }

}