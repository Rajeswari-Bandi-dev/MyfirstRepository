import { LightningElement, track } from 'lwc';

export default class multipopup extends LightningElement {
@track showModal1 = false;
@track showModal2 = false;
@track showModal3 = false;
@track showModal4 = false;

handleButtonClick(){
    alert('dxcfvbn')
}
handleButtonClick1() {
this.showModal1 = true;
}

handleButtonClick2() {
    this.showModal2 = true;
}

handleButtonClick3() {
    this.showModal3 = true;
    }
    
handleButtonClick4() {
    this.showModal4 = true;
}
    

handleCloseClick1() {
this.showModal1 = false;
}

handleCloseClick2() {
    this.showModal2 = false;
}

handleCloseClick3() {
    this.showModal3 = false;
}
    
handleCloseClick4() {
    this.showModal4 = false;
}

}