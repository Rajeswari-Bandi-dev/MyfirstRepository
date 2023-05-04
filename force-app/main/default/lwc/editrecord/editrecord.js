// import { LightningElement, wire, api, track} from 'lwc';
// import { updateRecord } from 'lightning/uiRecordApi';
// import { ShowToastEvent } from 'lightning/platformShowToastEvent';
// import { refreshApex } from '@salesforce/apex';
// import getChilds from '@salesforce/apex/CustomComp.getChilds';


// export default class LightningDatatableProject extends LightningElement {
    
//     @track value;
//     @track error;
//     @track data;        
//     @api recordId;    
//     @api childObjName;
//     @api fields;
//     @api parentFieldAPIName; 
//     @api tableColumns;
//     @track recordsCount = 0;    
//     @track items = []; 
//     @track data = [];      
//     @track columns;
//     wiredForRefresh;
//     result;
//     isPageChanged = false;
//     initialLoad = true;
//     mapoppNameVsOpp = new Map();
//     saveDraftValues = [];    
//     selectedRecords = []; 


//     get loadFields() {  
//         return this.childObjName + '-' + this.parentFieldAPIName + '-' + this.tableColumns + '-' + this.fields;               
//     }


//     connectedCallback(){
//         this.columns = JSON.parse( this.tableColumns.replace( /([a-zA-Z0-9]+?):/g, '"$1":' ).replace( /'/g, '"' ) );
//     }
  
//     //Calling the apex method and passing the parameters.
//     @wire(getChilds, {recordId: '$recordId', payload: '$loadFields'})
//     wiredRecord(value){
//         this.wiredForRefresh = value;
//         const { data, error } = value; 
//         if (data) {
//             this.items = data;
//             this.processRecords(data);
//             this.error = undefined;
//         } else if (error) {
//             this.error = error;
//             this.data = undefined;
//         }
//     }
      

//     //This function is to handles the update record on click of save button.
//     handleSave(event) {
//         this.saveDraftValues = event.detail.draftValues;
//         const recordInputs =  this.saveDraftValues.slice().map(draft => {
//             const fields = Object.assign({}, draft);
//             return { fields };
//         });
    
//         const promises = recordInputs.map(recordInput => updateRecord(recordInput));
//         Promise.all(promises).then(res => {
//             this.dispatchEvent(
//                 new ShowToastEvent({
//                     title: 'Success',
//                     message: 'Records Updated Successfully!!',
//                     variant: 'success'
//                 })
//             );              
//              // Display fresh data in the datatable
//             return refreshApex(this.wiredForRefresh);
//         }).catch(error => {
//              this.dispatchEvent(
//                 new ShowToastEvent({
//                    title: 'Error updating or reloading record',
//                    message: error.body.message,
//                    variant: 'error'
//                 })
//              );
//         }).finally(() => {
//             this.saveDraftValues = [];
//         });
//     }

//     processRecords(data){        
//         this.data = data;
//     }
            
//     //This method gets the selected records    
//     onRowSelection(event){
//         const selectedRows = event.detail.selectedRows;
//         this.recordsCount = event.detail.selectedRows.length;
//         this.selectedRecords=new Array();
//         for (let i = 0; i < selectedRows.length; i++) {
//             this.selectedRecords.push(selectedRows[i]);
//         }           
//     }
// }