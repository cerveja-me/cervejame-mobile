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
    movingPin=false;
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
             this.texting=false;
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
              // this.map=;
              this.map = new google.maps.Map(this.mapElement.nativeElement, mapOpt);

              this.updateAddress({0:this.map.getCenter().lat(),1:this.map.getCenter().lng()});
              this.loader.dismiss();

              this.map.addListener('dragstart',()=>{
                this.movingPin=true;
                this.zone.run(()=>{});

                //this.updateAddress({0:this.map.getCenter().lat(),1:this.map.getCenter().lng()});
              });
              this.map.addListener('dragend',()=>{
                this.movingPin=false;
                this.updateAddress({0:this.map.getCenter().lat(),1:this.map.getCenter().lng()});
              });

              this.map.addListener('center_changed',()=>{
                console.log('center_changed');

                //this.updateAddress({0:this.map.getCenter().lat(),1:this.map.getCenter().lng()});
              });
              var centerControlDiv = document.createElement('div');
                var centerControl = new this.centerControl(centerControlDiv, this.map,this.geoLoc);

                // centerControlDiv.index = 1;
                this.map.controls[google.maps.ControlPosition.BOTTOM_RIGHT].push(centerControlDiv);
          })
          .catch(e=>{
              console.log(e);
              this.loader.dismiss();
          });

      }
      centerControl(controlDiv, map,geo) {

        // Set CSS for the control border.
        var controlUI = document.createElement('div');
        controlUI.style.backgroundColor = '#fff';
        controlUI.style.border = '2px solid #fff';
        controlUI.style.borderRadius = '3px';
        controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
        controlUI.style.cursor = 'pointer';
        controlUI.style.marginBottom = '22px';
        controlUI.style.textAlign = 'center';
        controlUI.title = 'Click to recenter the map';
        controlDiv.appendChild(controlUI);

        // Set CSS for the control interior.
        var controlText = document.createElement('div');
        controlText.style.color = '';
        controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
        controlText.style.fontSize = '16px';
        controlText.style.lineHeight = '38px';
        controlText.style.paddingLeft = '5px';
        controlText.style.paddingRight = '5px';
        controlText.innerHTML = '<span class="icon-location"></span>';
        controlUI.appendChild(controlText);

        // Setup the click event listeners: simply set the map to Chicago.
        controlUI.addEventListener('click', function() {
          geo.getCurrentPosition()
          .then(l=>{
            console.log('currente ->',l );
          })
          var chicago = {lat: 41.85, lng: -87.65};

          map.setCenter(chicago);
        });

      }




      updateAddress(_loc){
          this.geoLoc.getAddressFromLocation(_loc)
          .then((address)=>{
              this.address=address;
              this.fulladdress=this.address['route'];
              this.number=this.address['street_number'];
              console.log(this.address);
              this.zone.run(()=>{});
          });
      }

      openAddressEdit(){
          this.showAddress=false;
          setTimeout(() => {
              // this.addressInput.setFocus();
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
        console.log('endereco->',address);
        let add = this.geoLoc.convertAddress(address);
        this.fulladdress=add['route'];
        this.number=add['street_number'];
        this.closeEdit();

          setTimeout(() => {
              this.map.setCenter(new google.maps.LatLng(address.geometry.location.lat,address.geometry.location.lng));
          }, 500);
          this.showAddress=true;
          this.addressOptions=[];
      }

      closeEdit(){
        this.showAddress=true;
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
