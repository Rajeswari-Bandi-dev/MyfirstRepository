import { LightningElement } from 'lwc';
import {
    subscribe,
    unsubscribe,
    onError,
    setDebugFlag,
    isEmpEnabled,
} from 'lightning/empApi';

export default class EmpApidemo extends LightningElement {
    result = "";
    channelname ="";
    issubscribed = false;
    subscription;
    buttonLabel = "Subscribe";

    connectedCallback() {
        if(!isEmpEnabled) {
            console.log('dont support EMP');
            return;
        }
        setDebugFlag(true);
        onError((error) => {
            console.error(error);
          });
    }

    getSubscribtionButtonlabel() {
        return this.issubscribed ? "unsubscribe" : "Subscribe";
    }

    
    handleChannelNamechange(target) {
        this.channelName = target.event.value;
    }
    handleSubscribtion(event){
        //if (!this.channelname) return;

      /*  if (this.channelname) {
            //Subcribtion logic
            this.handleSubscribe();
        } else{
            // Unsubcribtion logic
            this.handleUnsubscribe();
        }*/
        this.handleSubscribe();
        
    }

    handleSubscribe() {
        const messageCallback =(response) => {
            this.result = JSON.stringify(response, null, 2);
            alert(this.result);
            this.issubscribed = true;
            alert(this.issubscribed);
        }
        subscribe('/event/CustomEvent__e', -1, messageCallback)
            .then(response => {
                this.subscription = response;
                alert('Subscribed');
                this.issubscribed = true;
                this.buttonLabel = "UnSubscribe";
        });
    }

    handleUnsubscribe() {
    unsubscribe(this.subscription, () =>{
        this.issubscribed = false;
        this.result = "";
        });
    }
}