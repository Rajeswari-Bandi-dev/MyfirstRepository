import { LightningElement } from 'lwc';

export default class Button extends LightningElement {

    // result = false;
    // connectedCallback(){
    //     setTimeout(()=>{
    //         this.result=true;
    //     },3000)
    // }

    // CONDITIONAL RENDERING
    result = false;
    handlechange(event)
    {
        this.result = event.target.checked;
    }


}