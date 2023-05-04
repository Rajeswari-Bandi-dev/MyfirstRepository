import {LightningElement} from 'lwc';
import bootstrap from '@salesforce/resourceUrl/bootstrap'; //import boostrap
// import jquery from '@salesforce/resourceUrl/jquery'; //import jquery
import { loadStyle, loadScript } from 'lightning/platformResourceLoader'; //load 

export default class Boostrapdemo extends LightningElement {

    // rendering boostrap from file 
    renderedCallback() {
        Promise.all([
            loadScript(this, bootstrap + '/bootstrap-5.0.2-dist/js/bootstrap.js'),
            // bootstrap-5.0.2-dist\bootstrap-5.0.2-dist\js
            // loadScript(this, jquery),
            loadStyle(this, bootstrap + '/bootstrap-5.0.2-dist/css/bootstrap.min.css')
        ])
            .then(() => {
                console.log("boostrap working good.")
            })
            .catch(error => {
                console.log("failed to load the scripts");
            });
    }
}