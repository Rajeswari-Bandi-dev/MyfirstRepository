import { LightningElement, track, api } from 'lwc';

export default class PickListItem extends LightningElement {
    // selected values stores in item
    @api item;

    // called when component is created, flows from parent to child, parent fires 1st
    constructor () {
        super();
    }

    // access the Parent elements and modify them in this hook
    connectedCallback () {
        this._item =  JSON.parse(JSON.stringify (this.item));
    }
    get itemClass () {
        return 'slds-listbox__item ms-list-item' + (this.item.selected ? ' slds-is-selected' : '');
    }

    // when value is selected
    onItemSelected (event) {
        const evt = new CustomEvent ('items', { detail : {'item' :this.item, 'selected' : !this.item.selected }});
        this.dispatchEvent (evt); //what you call if you want to send or trigger an event,sends an Event to the object
        event.stopPropagation(); //prevent parent event handler from execution
    }
}