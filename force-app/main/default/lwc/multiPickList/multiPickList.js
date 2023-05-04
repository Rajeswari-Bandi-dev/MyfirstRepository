import {LightningElement, api, track} from 'lwc';
export default class MultiPickList extends LightningElement {

    // @api decorator is used to expose a property and method publicly.
    @api label  = ''; //Name of the dropDown
    @api maxselected  = 2; //Max selected item display
    @api options; // List of items to display
    @api showfilterinput = false; //show filterbutton
    @api showrefreshbutton = false; //show the refresh button
    @api showclearbutton = false; //show the clear button
    @api comboplaceholder = 'Select values'; //input box text
    
    //Track is used to track a value and rerende to component
    @track _initializationCompleted = false;
    @track _selectedItems = 'Select a value'; //number of dropdown values selected
    @track _filterValue; //filter text values
    @track _mOptions; //dropdown options

    // called when component is created, flows from parent to child, parent fires 1st
    constructor () {
        super();
        this._filterValue = '';
        this.showfilterinput = true;
        // this.showrefreshbutton = true;
        this.showclearbutton = true;
    }
    
    // flows from child to parent, trigger after every render 
    renderedCallback () {
        let self = this;
        if (!this._initializationCompleted) {
            //input search text box id(ms-input), addEventListener waits for event to occur, function takes care of secure and self caring
            this.template.querySelector ('.ms-input').addEventListener ('click', function (event) { 
                console.log ('multipicklist clicked');
                self.onDropDownClick(event.target); //onDropDownClick is a function
                event.stopPropagation ();//prevent parent event handler from execution
            });

            //one more value is selected
            this.template.addEventListener ('click', function (event) {
                console.log ('multipicklist-1 clicked');
                event.stopPropagation ();
            });

            // if user clicks on document close the dropdown listsetPickListName
            
            document.addEventListener ('click', function (event) {
                console.log ('document clicked');
                self.closeAllDropDown();
            });

            this._initializationCompleted = true;
            this.setPickListName (); //setPickListName function
        }
    }

    // handle selected dropdown values
    handleItemSelected (event) {
        let self = this;
        this._mOptions.forEach (function (eachItem) {
            //if all values in dropdown are selected get the details of all item
            if (eachItem.key == event.detail.item.key) {
                eachItem.selected = event.detail.selected;
                return;
            }
        });
        this.setPickListName ();   // based on selected items show name,count or placeholder on input
        this.onItemSelected ();    // get the details, based on selected picklist.
    }

    // filter dropdown values
    filterDropDownValues (event) {
        this._filterValue = event.target.value; 
        this.updateListItems (this._filterValue); //based on filter text show the dropdown values
    }


    // remove the filtered dropdown
    closeAllDropDown () {
        Array.from (this.template.querySelectorAll ('.ms-picklist-dropdown')).forEach (function (node) { //node-each picklist block
             node.classList.remove('slds-is-open');
        });
    }

    onDropDownClick (dropDownDiv) {
        let classList = Array.from (this.template.querySelectorAll ('.ms-picklist-dropdown'));//select the filtered dropdown values
        
        // slds-is-open is used to toggle visibility of the listbox, classlist doesn't equal to slds-is-open 
        if(!classList.includes("slds-is-open")){
            
            this.closeAllDropDown();

            // again search for item and add
            Array.from (this.template.querySelectorAll ('.ms-picklist-dropdown')).forEach (function (node) {
                node.classList.add('slds-is-open');
            });
        } 
        //classlist equal to slds-is-open 
        else {
            this.closeAllDropDown();
        }
    }

    // refresh and update selected values button 
    onRefreshClick (event) {
        this._filterValue = '';
        this.initArray (this); //all dropdown items
        this.updateListItems ('');
        this.onItemSelected ();
    }

    // clear filter text and update selected values
    onClearClick (event) {
        this._filterValue = '';
        this.updateListItems ('');
    }

    //called when component is inserted, flowsfrom parent to child
    connectedCallback () {  
        this.initArray (this); //all dropdown items
    }

    //push each values in the from of json to dropdown values
    initArray (context) {
        context._mOptions = new Array ();  
        context.options.forEach (function (eachItem) {
            context._mOptions.push (JSON.parse (JSON.stringify(eachItem)));
        });
    }

    //based on filter text show the dropdown values
    updateListItems (inputText) {
        Array.from (this.template.querySelectorAll('c-pick-list-item')).forEach (function (node) {
            //no input text show entire block
            if(!inputText){
                node.style.display = "block";
            }//if input text values equal to dropdown show filtered values 
            else if(node.item.value.toString().toLowerCase().indexOf(inputText.toString().trim().toLowerCase()) != -1){
                node.style.display = "block";
            }// text not equal to list show none 
            else{
                node.style.display = "none";
            }
        });
        this.setPickListName (); // based on selected items show name,count or placeholder on input
    }
    
    // based on selected items show name,count or placeholder on input
    setPickListName () {
        let selecedItems = this.getSelectedItems ();
        let selections = '' ;
        //selected item is 0 show placeholder
        if (selecedItems.length < 1) {
            selections = this.comboplaceholder;
        //selected item is greater then 2 show number with text
        } else if (selecedItems.length > this.maxselected) {
            selections = selecedItems.length + ' Options Selected';
        } else {
            //selected item is 0 show item
            selecedItems.forEach (option => {
                selections += option.value+',';
            });
        }
        this._selectedItems = selections;
    }

    // storing all selected dropdown items in resArray
    @api
    getSelectedItems () {
        let resArray = new Array (); //declaring new array
        this._mOptions.forEach (function (eachItem) { //_mOptions means dropdown options
            if (eachItem.selected) {
                resArray.push (eachItem);
            }
        });
        return resArray;
    }

    // get the details, based on selected picklist.
    onItemSelected () {
        const evt = new CustomEvent ('itemselected', { detail : this.getSelectedItems ()});  //storing all selected dropdown items in resArray
        this.dispatchEvent (evt);
    }
}