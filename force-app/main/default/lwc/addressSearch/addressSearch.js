import { LightningElement, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getAddressRecommendations from '@salesforce/apex/AddressSearchController.getAddressRecommendations';
import getAddressDetailsByPlaceId from '@salesforce/apex/AddressSearchController.getAddressDetailsByPlaceId';
import updateAddressDetails from '@salesforce/apex/AddressSearchController.updateAddressDetails';
 
export default class AddressSearch extends LightningElement {
    @api recordId;
    @api objectApiName;
    openModal = false;
    showSpinner = false;
    fieldApiNames = ['BillingStreet', 'BillingCity', 'BillingState', 'BillingPostalCode', 'BillingCountry'];
    addressRecommendations;
    selectedAddress = '';
    addressDetail = {};
    // hasRecommendations = true;
 
    get hasRecommendations() {
        return (this.addressRecommendations !== null && this.addressRecommendations.length);
    }
    
    handleChange(event) {
        event.preventDefault();
        let searchText = event.target.value;
        this.openModal = true;
        if (searchText) this.getAddressRecommendations(searchText);
        else this.addressRecommendations = [];
    }
 
    getAddressRecommendations(searchText) {
        getAddressRecommendations({ searchText: searchText })
            .then(response => {
                response = JSON.parse(response);
                let addressRecommendations = [];
                response.predictions.forEach(prediction => {
                    addressRecommendations.push({
                        main_text: prediction.structured_formatting.main_text,
                        secondary_text: prediction.structured_formatting.secondary_text,
                        place_id: prediction.place_id,
                    });
                });
                this.addressRecommendations = addressRecommendations;
            }).catch(error => {
                console.log('error : ' + JSON.stringify(error));
            });
    }
 
    handleAddressRecommendationSelect(event) {
        event.preventDefault();
        let placeId = event.currentTarget.dataset.value;
        this.addressRecommendations = [];
        this.selectedAddress = '';
        getAddressDetailsByPlaceId({ placeId: placeId })
            .then(response => {
                response = JSON.parse(response);
                response.result.address_components.forEach(address => {
                    let type = address.types[0];
                    switch (type) {
                        case 'locality':
                            this.selectedAddress = this.selectedAddress + ' ' + address.long_name;
                            this.addressDetail.city = address.long_name;
                            break;
                        case 'country':
                            this.selectedAddress = this.selectedAddress + ' ' + address.long_name;
                            this.addressDetail.country = address.long_name;
                            break;
                        case 'administrative_area_level_1':
                            this.selectedAddress = this.selectedAddress + ' ' + address.short_name;
                            this.addressDetail.state = address.short_name;
                            break;
                        case 'postal_code':
                            this.selectedAddress = this.selectedAddress + ' ' + address.long_name;
                            this.addressDetail.postalCode = address.long_name;
                            break;
                        case 'sublocality_level_2':
                            this.selectedAddress = this.selectedAddress + ' ' + address.long_name;
                            this.addressDetail.subLocal2 = address.long_name;
                            break;
                        case 'sublocality_level_1':
                            this.selectedAddress = this.selectedAddress + ' ' + address.long_name;
                            this.addressDetail.subLocal1 = address.long_name;
                            break;
                        case 'street_number':
                            this.selectedAddress = this.selectedAddress + ' ' + address.long_name;
                            this.addressDetail.streetNumber = address.long_name;
                            break;
                        case 'route':
                            this.selectedAddress = this.selectedAddress + ' ' + address.short_name;
                            this.addressDetail.route = address.short_name;
                            break;
                        default:
                            break;
                    }
                });
            })
            .catch(error => {
                console.log('error : ' + JSON.stringify(error));
            });
    }
    
    // handleModal(event) {
    //     event.preventDefault();
    //     this.openModal = true;
    //     this.addressRecommendations = [];
    // }
 
    // closeModal(event) {
    //     event.preventDefault();
    //     this.openModal = false;
    //     this.addressRecommendations = [];
    // }
 
    // saveAddress(event) {
    //     event.preventDefault();
    //     this.openModal = false;
    //     this.showSpinner = true;
    //     this.addressDetail.Id = this.recordId;
    //     updateAddressDetails({ jsonAddress: JSON.stringify(this.addressDetail) })
    //         .then(() => {
    //             const event = new ShowToastEvent({
    //                 title: 'Success',
    //                 message: 'Account address is updatd successfully.',
    //                 variant: 'success'
    //             });
    //             this.dispatchEvent(event);
    //             this.showSpinner = false;
    //         })
    //         .catch(error => {
    //             const event = new ShowToastEvent({
    //                 title: 'Error',
    //                 message: 'An error has occured in saving the address.',
    //                 variant: 'error'
    //             });
    //             this.dispatchEvent(event);
    //             console.log('error : ' + JSON.stringify(error));
    //             this.showSpinner = false;
    //         });
        
    // }
}