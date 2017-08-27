import { Component, ViewChild,ElementRef,NgZone } from '@angular/core';
import { NavController, NavParams,Platform,ModalController,LoadingController } from 'ionic-angular';

import { Keyboard } from '@ionic-native/keyboard';

import { DeviceProvider } from '../../providers/device/device';
import { GeolocationProvider } from '../../providers/geolocation/geolocation';
import { OrderProvider } from '../../providers/order/order';

import { CheckoutModalPage } from '../checkout-modal/checkout-modal';
import { MapAddressPage } from '../map-address/map-address';

declare var google;

@Component({
    selector: 'page-map',
    templateUrl: 'map.html',
})
export class MapPage {
    @ViewChild('map') mapElement: ElementRef;

    map: any;
    showAddress=true;
    address;
    fulladdress;
    addressOptions=[];
    complement='';
    number='';
    loader;
    texting:boolean=false;
    oldLoc:any={};
    originalMapCenter:any={};
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public modalCtrl:ModalController,
        public zone:NgZone,
        public platform:Platform,
        public load:LoadingController,
        public geoLoc:GeolocationProvider,
        public device:DeviceProvider,
        public order:OrderProvider,
        private keyboard:Keyboard
        ) {

    }

    ionViewDidLoad() {
        this.device.camPage("map");
        this.loadMap();
    }

    loadMap(){
        this.loader=this.load.create({
            content: this.device.getRandonLoading()
        });
        this.loader.present();
        this.geoLoc.getMap()
        .then((mapOpt)=>{
            this.map = new google.maps.Map(this.mapElement.nativeElement, mapOpt);
            this.originalMapCenter=this.map.getCenter();
            this.map.addListener('center_changed',()=>{

                    this.updateAddress({0:this.map.getCenter().lat(),1:this.map.getCenter().lng()});
                            });
            this.updateAddress({0:this.map.getCenter().lat(),1:this.map.getCenter().lng()});
            this.loader.dismiss();
        })
        .catch(e=>{
            console.log(e);
            this.loader.dismiss();
        });
    }

    updateAddress(_loc){
        this.geoLoc.getAddressFromLocation(_loc)
        .then((address)=>{
            this.address=address;
            this.zone.run(()=>{});
        });
    }

    openAddressEdit(){
      let addressModal = this.modalCtrl.create(MapAddressPage,{"address":this.address,"complement":this.complement});
      addressModal.present();
    }

    addressChange(){
        if(this.address.formated.length >3){
            this.geoLoc.getLocationsWithAddres(this.fulladdress)
            .then((listAddress)=>{
                this.addressOptions=listAddress['results'];
            })
        }
    }


    finishOrder(){
        let loca={0:this.map.getCenter().lat(),1:this.map.getCenter().lng()}
        let modal = this.modalCtrl.create(CheckoutModalPage,{"location":loca,"address":this.address,"complement":this.complement});
        modal.present();
        modal.onDidDismiss(data=>{
            if(data==='cancel'){
                this.device.camPage("map");
            }

        })

    }

}
