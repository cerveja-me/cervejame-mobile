import { Component, ViewChild,ElementRef,NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams,Platform,ModalController } from 'ionic-angular';

import { DeviceProvider } from '../../providers/device/device';
import { GeolocationProvider } from '../../providers/geolocation/geolocation';
import { OrderProvider } from '../../providers/order/order';

import { CheckoutModalPage } from '../checkout-modal/checkout-modal';


declare var google;

@Component({
    selector: 'page-map',
    templateUrl: 'map.html',
})
export class MapPage {
    @ViewChild('map') mapElement: ElementRef;
    @ViewChild('inputaddress') addressInput ;

    map: any;
    showAddress=true;
    address;
    fulladdress;
    addressOptions=[];
    complement='';
    number='';

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public modalCtrl:ModalController,
        public zone:NgZone,
        public platform:Platform,
        public geoLoc:GeolocationProvider,
        public device:DeviceProvider,
        public order:OrderProvider
        ) {
    }

    ionViewDidLoad() {
        this.device.camPage("map");
        this.loadMap();
    }

    loadMap(){
        this.device.displayLoading();
        this.geoLoc.getMap()
        .then((mapOpt)=>{
            // this.map=;
            this.map = new google.maps.Map(this.mapElement.nativeElement, mapOpt);
            this.map.addListener('center_changed',()=>{
                this.updateAddress({0:this.map.getCenter().lat(),1:this.map.getCenter().lng()});
            });
            this.updateAddress({0:this.map.getCenter().lat(),1:this.map.getCenter().lng()});
            this.device.hideLoading();
        })
        .catch(this.device.hideLoading);

    }

    updateAddress(_loc){
        this.geoLoc.getAddressFromLocation(_loc)
        .then((address)=>{
            this.address=address;
            this.zone.run(()=>{});
        });
    }

    openAddressEdit(){
        this.showAddress=false;
        setTimeout(() => {
            this.addressInput.setFocus();
        },150);
    }

    addressChange(){
        //   console.log('address change');
        if(this.address.formated.length >3){
            this.geoLoc.getLocationsWithAddres(this.fulladdress)
            .then((listAddress)=>{
                this.addressOptions=listAddress['results'];
            })
        }
    }

    setAddress(address){
        this.closeEdit();
        setTimeout(() => {
            this.map.setCenter(new google.maps.LatLng(address.geometry.location.lat,address.geometry.location.lng));
        }, 500);
        this.showAddress=true;
    }

    closeEdit(){
        if(this.platform.is('core')){
            let activeElement = <HTMLElement>document.activeElement;
            activeElement && activeElement.blur && activeElement.blur();
        }
    }

    finishOrder(){
        let loca={0:this.map.getCenter().lat(),1:this.map.getCenter().lng()}
        let modal = this.modalCtrl.create(CheckoutModalPage,{"location":loca,"address":this.address,"complement":this.complement});
        modal.present();
    }


}
