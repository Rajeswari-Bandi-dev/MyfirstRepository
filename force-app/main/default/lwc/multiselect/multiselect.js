// htmlEmailEditor.js
import { LightningElement, api } from 'lwc';
export default class HtmlEmailEditor extends LightningElement {

    @api 
    inputVariables;
    
    @api 
    builderContext;

    get senderName() {
        const param = this.inputVariables.find(({ name }) => name === 'senderName');
        return param && param.value;
    }

    get options() {
        const variables = this.builderContext.variables;
        return variables.map(({ name, value }) => ({
            label: name,
            value: value.stringValue,
        }));
    }

    handleChange(event) {
        if (event && event.detail) {
            const newValue = event.detail.value;
            const valueChangedEvent = new CustomEvent(
                'Configuration_editor_input_value_changed',  {
                    bubbles: true,
                    cancelable: false,
                    composed: true,
                    detail: {
                        name: 'senderName',
                        newValue,
                        newValueDataType: 'String',
                    },
                 }
            );
            this.dispatchEvent(valueChangedEvent);
        }
    }
}