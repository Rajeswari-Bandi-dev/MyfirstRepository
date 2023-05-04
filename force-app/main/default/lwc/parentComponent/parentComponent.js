export default class ParentComponent extends LightningElement {
    options = [
      {
        label: 'Option 1',
        value: 'option1'
      },
      {
        label: 'Option 2',
        value: 'option2'
      },
      {
        label: 'Option 3',
        value: 'option3'
      }
    ];
  
    selectedOptions = [];
  
    handleChange(event) {
      this.selectedOptions = event.detail;
    }
  }