import { Component, ViewChild,ElementRef,NgZone } from '@angular/core';
import { NavController, NavParams,Platform,ModalController,LoadingController } from 'ionic-angular';

import { Keyboard } from '@ionic-native/keyboard';

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
          keyboard.onKeyboardShow().subscribe(data=>{
            this.texting=true;
          })
          keyboard.onKeyboardHide().subscribe(data=>{
            this.texting=true;
          })
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
                if(this.texting && this.showAddress){
                  this.texting=false;
                  this.map.setCenter(this.originalMapCenter);
                }else if(!this.showAddress){
                  this.originalMapCenter=this.map.getCenter();
                  this.updateAddress({0:this.map.getCenter().lat(),1:this.map.getCenter().lng()});
                }else{
                  if(!(this.originalMapCenter.lat()==this.map.getCenter().lat())){
                    this.originalMapCenter=this.map.getCenter();
                    this.updateAddress({0:this.map.getCenter().lat(),1:this.map.getCenter().lng()});
                  }
                }
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
        this.showAddress=false;
        setTimeout(() => {
            this.addressInput.setFocus();
        },150);
    }

    addressChange(){
        if(this.address.formated.length >3){
            this.geoLoc.getLocationsWithAddres(this.fulladdress)
            .then((listAddress)=>{
                this.addressOptions=listAddress['results'];
            })
        }
    }

    setAddress(address){
      /*
      fechar o teclado

      */
        this.closeEdit();
        this.keyboard.close()
        setTimeout(() => {
            this.map.setCenter(new google.maps.LatLng(address.geometry.location.lat,address.geometry.location.lng));
            this.showAddress=true;
        }, 500);



    }

    closeEdit(){
        if(this.platform.is('cordova')){
            let activeElement = <HTMLElement>document.activeElement;
            activeElement && activeElement.blur && activeElement.blur();
        }
    }

    finishOrder(){
        this.closeEdit();
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
