import { Component, ViewChild,Input, ElementRef,Injectable, NgZone } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ModalMapPage } from '../modal-map/modal-map';
import { ModalAddressPage } from '../modal-address/modal-address';
import {LoadingController, NavController, ModalController, Platform, NavParams } from 'ionic-angular';
import { Device } from '../../providers/device';
import { User } from '../../providers/user';

import { Keyboard } from 'ionic-native';

declare var google;

declare var UXCam:any;

/*
  Generated class for the Map page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
  */
  @Component({
    selector: 'page-map',
    templateUrl: 'map.html'
  })
  export class MapPage {
    @ViewChild('map') mapElement: ElementRef;
    @ViewChild('inputaddress') addressInput ;
    map: any;
    loader = this._loading.create({
      content: this._device.getRandonLoading()
    });
    showAddress=true;
    address;
    fulladdress;
    addressOptions=[];
    complement='';
    number='';
    constructor(public navCtrl: NavController,
      public modalCtrl:ModalController,
      private _device:Device,
      private zone:NgZone,
      private _user:User,
      public platform: Platform,
      private _loading:LoadingController,
      private keyboard:Keyboard) {

      if(this.platform.is('core'))
        UXCam.tagScreenName("map");
    }

    ionViewDidLoad() {
      this.loader.present();
      this.loadMap();
    }

    loadMap(){
      this.loader.present();
      this._device.getLocation()
      .then((location)=>{
        let latLng = new google.maps.LatLng(location[0], location[1]);
        let mapOptions = {
          clickableIcons:false,
          disableDoubleClickZoom:true,
          fullscreenControl:false,
          panControl:false,
          rotateControl:false,
          scaleControl:false,
          scrollwheel  :false,
          signInControl:false,
          streetViewControl:false,
          zoomControl:false,
          mapTypeControl:false,
          zoom: 17,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }

        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
        this.map.addListener('center_changed',()=>{
          let _loc={0:this.map.getCenter().lat(),1:this.map.getCenter().lng()}
          this._user.getAddressFromLocation(_loc)
          .then((address)=>{
            this.address=address;
            this.zone.run(()=>{});

          });
        });
        this.map.setCenter(latLng);
        this.loader.dismiss();
      })

    }
    openAddressEdit(){
      this.showAddress=false;
      setTimeout(() => {
        this.addressInput.setFocus();
      },150);
    }
    addressChange(){
      if(this.address.formated.length >3){
        this._device.getLocationsWithAddres(this.fulladdress)
        .then((listAddress)=>{
          this.addressOptions=listAddress['results'];
        })
      }
    }
    closeEdit(){
      if(this.platform.is('core'))
        this.keyboard.close();

      console.log('fechar o teclado agora');
    }

    setAddress(address){
      this.map.setCenter(new google.maps.LatLng(address.geometry.location.lat,address.geometry.location.lng));
      this.showAddress=true;
    }
    openModal(){
      let loca={0:this.map.getCenter().lat(),1:this.map.getCenter().lng()}
      let modal = this.modalCtrl.create(ModalMapPage,{"location":loca,"address":this.address,"complement":this.complement});
      modal.present();
    }
  }
