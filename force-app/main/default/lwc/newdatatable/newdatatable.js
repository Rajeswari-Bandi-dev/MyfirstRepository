// datatable
import { LightningElement, wire, api, track} from 'lwc';
import { refreshApex } from '@salesforce/apex'; //refresh the page
import getconct from '@salesforce/apex/newaccount.getconct'; //calling apex method 

// create record
// import { createRecord } from 'lightning/uiRecordApi'; //provides JavaScript APIs to create, delete, update, and refresh records.
// import { ShowToastEvent } from 'lightning/platformShowToastEvent'; //provide feedback to user, remains 3 sec ,popup
import { NavigationMixin } from 'lightning/navigation'; // A component calls this API to navigate to another page in the application.
// import CONTACT_OBJECT from '@salesforce/schema/Contact';
// import contactFirstName from '@salesforce/schema/Contact.FirstName';
// import contactLastName from '@salesforce/schema/Contact.LastName';
// import contactPhone from '@salesforce/schema/Contact.Phone';
// import contactEmail from '@salesforce/schema/Contact.Email';
// import contactLeadSource from '@salesforce/schema/Contact.LeadSource';
// import accountFieldId from '@salesforce/schema/Contact.AccountId'; 

import LightningAlert from "lightning/alert";

const columns = [{
        label: 'Name',
        fieldName: 'Name',
        type: 'text',
        sortable: true
        // sortable: contactCreatedById
    },

    {
        label: 'Title',
        fieldName: 'Title',
        sortable: true
        // sortable: contactCreatedById
    },

    {
        label: 'Email',
        fieldName: 'Email',
        sortable: true
        // sortable: contactCreatedById
    },

    {
        label: 'Phone',
        fieldName: 'Phone',
        sortable: true
        // sortable: contactCreatedById
    },

    {
        label: 'Account Name',
        fieldName: 'AccountName',
        type: 'text',
        sortable: true
        // sortable: contactCreatedById
    }
];

export default class newdatatable extends NavigationMixin(LightningElement) { 
    // popup model 
    // value = [];
    @track isModalOpen = false; //tracking pop up model
    // @track selectedAccountId;
    // @track picklistval;
    // @track contactId;    
    // firstname = '';   
    // lastname = '';  
    // phoneNo = '';
    // emailId = '';


    // @track loader = false;
    // this.loader = false;
    @track value;
    @track error;
    @track data; //data of datatable
    @api sortedDirection = 'asc';
    @api sortedBy = 'Name'; //datatable sort column
    @api searchKey = '';  //search input value
    result;
    @track allSelectedRows = []; 
    @track page = 1; 
    @track items = []; 
    @track data = []; 
    @track columns; 
    @track startingRecord = 1;
    @track endingRecord = 0; 
    @track pageSize = 10; //number of records to show at once
    @track totalRecountCount = 0;  //after input total number of records
    @track totalPage = 0; //total number of pages
    isPageChanged = false;
    initialLoad = true;
    mapconNameVsCon = new Map();;

    // used specify a wire adapter or an Apex method.
    @wire(getconct, {searchKey: '$searchKey', sortBy: '$sortedBy', sortDirection: '$sortedDirection'})

    wiredAccounts({ error, data }) {

        // if data is present
        if (data) {
            console.log('ergrgvxdr');
            this.processRecords(data);
            console.log(data,this.processRecords(data));
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.data = undefined;
        }
    }

    // return filetred data
    processRecords(data){
        this.items = data;
            this.totalRecountCount = data.length; 
            this.totalPage = Math.ceil(this.totalRecountCount / this.pageSize); //ceil: Rounds totalPage number up to the nearest integer.
            this.data = this.items.slice(0,this.pageSize); //return inbetween data of pagesize
            this.endingRecord = this.pageSize;
            this.columns = columns;
    }

    //clicking on previous button this method will be called
    previousHandler() {
        this.isPageChanged = true;
        if (this.page > 1) {
            this.page = this.page - 1; //decrease page by 1
            this.displayRecordPerPage(this.page);
        }
          var selectedIds = [];
          for(var i=0; i<this.allSelectedRows.length;i++){
            selectedIds.push(this.allSelectedRows[i].Id);
          }

        this.template.querySelector(
            '[data-id="table"]'
          ).selectedRows = selectedIds;
    }

    //clicking on next button this method will be called
    nextHandler() {
        this.isPageChanged = true;
        if((this.page<this.totalPage) && this.page !== this.totalPage){
            this.page = this.page + 1; //increase page by 1
            this.displayRecordPerPage(this.page);            
        }

          var selectedIds = [];
          for(var i=0; i<this.allSelectedRows.length;i++){
            selectedIds.push(this.allSelectedRows[i].Id);
          }

        this.template.querySelector(
            '[data-id="table"]'
          ).selectedRows = selectedIds;
    }

    //this method displays records page by page
    displayRecordPerPage(page){
        this.startingRecord = ((page -1) * this.pageSize) ;
        this.endingRecord = (this.pageSize * page);
        this.endingRecord = (this.endingRecord > this.totalRecountCount) 
                            ? this.totalRecountCount : this.endingRecord; 
        this.data = this.items.slice(this.startingRecord, this.endingRecord);
        this.startingRecord = this.startingRecord + 1;
    }    

    // sort columns 
    sortColumns( event ) {
        this.sortedBy = event.detail.fieldName;
        this.sortedDirection = event.detail.sortDirection;
        return refreshApex(this.result); // Refresh Apex data that the wire service provisioned
    }

    // onRowSelection(event){
    //     if(!this.isPageChanged || this.initialLoad){
    //         if(this.initialLoad) this.initialLoad = false;
    //         this.processSelectedRows(event.detail.selectedRows);
    //     }else{
    //         this.isPageChanged = false;
    //         this.initialLoad =true;
    //     } 
    // }

    // // on row selectction
    // processSelectedRows(selectedconct){
    //     var newMap = new Map();
    //     for(var i=0; i<selectedconct.length;i++){
    //         if(!this.allSelectedRows.includes(selectedconct[i])){
    //             this.allSelectedRows.push(selectedconct[i]); // push all selected row to selectedconct variable
    //         }
    //         this.mapconNameVsCon.set(selectedconct[i].Name, selectedconct[i]);
    //         newMap.set(selectedconct[i].Name, selectedconct[i]);
    //     }
    //     for(let [key,value] of this.mapconNameVsCon.entries()){
    //         if(newMap.size<=0 || (!newMap.has(key) && this.initialLoad)){
    //             const index = this.allSelectedRows.indexOf(value);
    //             if (index > -1) {
    //                 this.allSelectedRows.splice(index, 1); 
    //             }
    //         }
    //     }
    // }

    // selecting rows
    onRowSelection(event) {
        var selectedRows=event.detail.selectedRows;
        if(selectedRows.length>1)
        {
            var el = this.template.querySelector('lightning-datatable');
            selectedRows=el.selectedRows=el.selectedRows.slice(1);
            console.log(selectedRows); //out row3 like that
            this.showNotification();
            event.preventDefault();
            return;
        }
    }
    showNotification() {
        // const event = new ShowToastEvent({
        //     title: 'Error',
        //     message: 'Only one row can be selected',
        //     variant: 'warning',
        //     mode: 'pester'
        // });
    //     const event = new LightningAlert({
    //         message: "Only one row can be selected",
    //         theme: "error",
    //         label: "Alert Header"
    //       });
    //     this.dispatchEvent(event);
    // }
    this.dispatchEvent(
        LightningAlert.open({
                    message: "Only one row can be selected",
                    theme: "error",
                    label: "Alert Header"
                  }),
    );
                }


    // search input, 
    handleKeyChange( event ) {
        this.searchKey = event.target.value;
        var data = [];
        for(var i=0; i<this.items.length;i++){
            if(this.items[i]!= undefined && this.items[i].Name.includes(this.searchKey)){
                data.push(this.items[i]);
            }
        }
        this.processRecords(data); // filtered data
    }

    // // pop up record create form starts here
    // contactHandleChange(event) {
    //     console.log(event.target.label);
    //     console.log(event.target.value);        
    //     if(event.target.label=='First Name'){
    //         this.firstname = event.target.value;
    //     }
    //     if(event.target.label=='Last Name'){
    //         this.lastname = event.target.value;
    //     }   
        
    //     if(event.target.label=='Phone'){
    //         this.phoneNo = event.target.value;
    //     }
 
    //     if(event.target.label=='Email'){
    //         this.emailId = event.target.value;
    //     }
                   
    // }
 
    // createLookupContactAction(){
    //     console.log(this.selectedAccountId);
    //     console.log(this.picklistval);
    //     const fields = {};
    //     fields[contactFirstName.fieldApiName] = this.firstname;
    //     fields[contactLastName.fieldApiName] = this.lastname;
    //     fields[contactPhone.fieldApiName] = this.phoneNo;
    //     fields[contactEmail.fieldApiName] = this.emailId;
    //     fields[contactLeadSource.fieldApiName] = this.picklistval;
        
    //     fields[accountFieldId.fieldApiName] = this.selectedAccountId;

    //     const recordInput = { apiName: CONTACT_OBJECT.objectApiName, fields }; 
    //     createRecord(recordInput)
    //         .then(contactobj=> {
    //             this.contactId = contactobj.id;
    //             this.fields={};
    //             this.dispatchEvent( //firing an event
    //                 new ShowToastEvent({
    //                     title: 'Success',
    //                     message: 'Contact created successfully..!',
    //                     variant: 'success',
    //                 }),
    //             );
    //             this.isModalOpen = false;
                
    //             // after creating new record navigate to the contact record page
    //             // this[NavigationMixin.Navigate]({
    //             //     type: 'standard__recordPage',
    //             //     attributes: {
    //             //         recordId: contactobj.id,
    //             //         objectApiName: 'Contact',
    //             //         actionName: 'view'
    //             //     },
    //             // });
 
 
    //         }
    //         )
    //         .catch(error => {
    //             this.dispatchEvent(
    //                 new ShowToastEvent({
    //                     title: 'Error Please enter the valid details',
    //                     message: error.body.message,
    //                     variant: 'error',
    //                 }),
    //             );
    //         });
    //         window.location.reload()
           
    // }
    // myLookupHandle(event){ //lookup field 
    //     console.log(event.detail);
    //     this.selectedAccountId = event.detail;
    // }

    // handlepicklist(event){
    //     console.log(event.detail.value);
    //     this.picklistval = event.detail.value;
    //     console.log(this.picklistval);
    // }

    // open pop up
    openModal() {
        // to open modal set isModalOpen tarck value as true
        this.isModalOpen = true;
    }

    // close pop up model
    handlepopval(){ 
        this.isModalOpen = false;
        return refreshApex(this.wiredAccounts); 
    }
}