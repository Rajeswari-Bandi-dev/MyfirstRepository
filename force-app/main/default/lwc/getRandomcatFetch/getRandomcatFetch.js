import { LightningElement } from 'lwc';

export default class GetRandomcatFetch extends LightningElement {
imageURL;
connectedCallback() {
    fetch("https://api.thecatapi.com/v1/images/search",{method:"Get"})
    .then((response)=> response.json())
    .then((data)=>{
        console.log("🚀 ~ data", data);
           this.imageURL = data[0].url;
    });
}
}