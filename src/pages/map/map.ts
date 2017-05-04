import { Component, ViewChild, ElementRef  } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoadingController } from 'ionic-angular';

import { ModalMapPage } from '../modal-map/modal-map';
import { ModalAddressPage } from '../modal-address/modal-address';
import { NavController, ModalController, Platform, NavParams } from 'ionic-angular';
import { Injectable, NgZone } from '@angular/core';
import { Device } from '../../providers/device';
import { User } from '../../providers/user';

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
    map: any;
    loader = this._loading.create({
      content: this._device.getRandonLoading()
    });
    showAddress=true;
    address;
    fullAddress;
    addressOptions=[];
    complement='';
    number='';
    constructor(public navCtrl: NavController,
      public modalCtrl:ModalController,
      private _device:Device,
      private zone:NgZone,
      private _user:User,
      public platform: Platform,
      private _loading:LoadingController) {
      if(this.platform.is('core'))
        UXCam.tagScreenName("map");
    }

    ionViewDidLoad() {
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
          })
        });
        this.map.setCenter(latLng);
      })

    }
    openAddressEdit(){
      this.showAddress=false;
    }
    addressChange(){
      if(this.address.formated.length >3){
        this._device.getLocationsWithAddres(this.address.formated)
        .then((listAddress)=>{
          this.addressOptions=listAddress['results'];
        })
      }
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
