import { LightningElement, track } from 'lwc';

export default class PopUpOne extends LightningElement {
@track showPopUp = false;

displayPopUp() {
this.showPopUp = true;
}

closePopUp() {
this.showPopUp = false;
}
}