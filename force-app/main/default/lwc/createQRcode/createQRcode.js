import { LightningElement } from 'lwc';
import {ShowToastEvent } from "lightning/platformShowToastEvent";

const QR_API_URL = "https://api.qrserver.com/v1/create-qr-code";

export default class CreateQRcode extends LightningElement {

    url = "";
    imgSrc = "";
    EnterURL = "http://lwc.dev";

    handleCreate() {
        const apiUrl = QR_API_URL + '?data=${encodeURIComponent(this.url)}&size=100X100';
        fetch( apiUrl,{
            method: "GET"
        })
        .then(res =>
            {
                if(!res.ok){
                    //handler error
                    const toast = new ShowToastEvent({
                        title: "An error ocurred",
                        message: res.statusText,
                        variant: "error"
                    });
                    this.dispatchEvent(toast);
                }
                return res.blob();
            })
            .then(blob =>{
                return new Promise((resolve) => {
                    const reader = new FileReader();
                    reader.onloadend = () =>{
                        resolve(reader.result);
                     }
                   reader.readAsArrayBuffer(blob);
                    
                });
            })
            
            .then(Image =>{
                this.imgSrc = Image;
            })
            
    }
   
}