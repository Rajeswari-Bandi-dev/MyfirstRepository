import { LightningElement, track} from  'lwc';
export  default  class  Trackchild  extends  LightningElement {
@track greeting = 'Hello World';

  changeHandler(event) {
    this.greeting = event.target.value;
  }

}