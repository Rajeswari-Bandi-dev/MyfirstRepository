import { LightningElement,track } from 'lwc';

export default class ModalDemoInLWC extends LightningElement {
    @track isShowModal1 = false;
    @track isShowModal2 = false;
    @track isShowModal3 = false;
    @track isShowModal4 = false;

    showModalBox1() {  
        this.isShowModal1 = true;
        // this.isShowModal2 = false;
        // this.isShowModal3 = false;
        // this.isShowModal4 = false;
    }
    
    showModalBox2() {  
        // this.isShowModal1 = false;
        this.isShowModal2 = true;
        // this.isShowModal3 = false;
        // this.isShowModal4 = false;
    }

    showModalBox3() {  
        // this.isShowModal1 = false;
        // this.isShowModal2 = false;
        this.isShowModal3 = true;
        // this.isShowModal4 = false;
    }

    showModalBox4() {  
        // this.isShowModal1 = false;
        // this.isShowModal2 = false;
        // this.isShowModal3 = false;
        this.isShowModal4 = true;
    }

    hideModalBox1() {  
        this.isShowModal1 = false;
        // this.isShowModal2 = true;
        // this.isShowModal3 = true;
        // this.isShowModal4 = true;
    }

    hideModalBox2() { 
        // this.isShowModal1 = true;
        this.isShowModal2 = false;
        // this.isShowModal3 = false;
        // this.isShowModal4 = false;
    }

    hideModalBox3() {  
        // this.isShowModal1 = false;
        // this.isShowModal2 = true;
        this.isShowModal3 = false;
        // this.isShowModal4 = true;
    }

    hideModalBox4() {  
        // this.isShowModal1 = false;
        // this.isShowModal2 = true;
        // this.isShowModal3 = true;
        this.isShowModal4 = false;
    }

}