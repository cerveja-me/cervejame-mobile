import { Component, ViewChild,ElementRef,NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { DeviceProvider } from '../../providers/device/device';
import { GeolocationProvider } from '../../providers/geolocation/geolocation';
import { OrderProvider } from '../../providers/order/order';



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
        public device:DeviceProvider,
        public order:OrderProvider,
        public zone:NgZone,
        public geoLoc:GeolocationProvider
        ) {
    }

    ionViewDidLoad() {
        this.loadMap();
    }

    loadMap(){
        // this.loader.present();
        this.geoLoc.getMap()
        .then((mapOpt)=>{
            // this.map=;
            this.map = new google.maps.Map(this.mapElement.nativeElement, mapOpt);
            this.map.addListener('center_changed',()=>{
                this.updateAddress({0:this.map.getCenter().lat(),1:this.map.getCenter().lng()});
            });
            this.updateAddress({0:this.map.getCenter().lat(),1:this.map.getCenter().lng()});
        })

    }
    updateAddress(_loc){
        this.geoLoc.getAddressFromLocation(_loc)
        .then((address)=>{
            this.address=address;
            this.zone.run(()=>{});
        });
    }

    openModal(){}


}
