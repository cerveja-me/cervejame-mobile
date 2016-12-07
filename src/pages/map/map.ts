import { Component, ViewChild, ElementRef  } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoadingController } from 'ionic-angular';

import { ModalMapPage } from '../modal-map/modal-map';
import { NavController, ModalController, Platform, NavParams } from 'ionic-angular';
import { Injectable, NgZone } from '@angular/core';
import { Device } from '../../providers/device';
import { User } from '../../providers/user';
declare var google;
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

    address;
    addressOptions=[];
    constructor(public navCtrl: NavController,
      public modalCtrl:ModalController,
      private _device:Device,
      private zone:NgZone,
      private _user:User,
      private _loading:LoadingController) {}

    ionViewDidLoad() {
      this.loadMap();
    }

    loadMap(){
      this.loader.present();
      this._device.getLocation()
      .then((location)=>{
        let latLng = new google.maps.LatLng(location[0], location[1]);
        this._device.getAddressFromLocation(location)
        .then((address)=>{
          this.setAddressNew(address);
          let endereco = address['formatted_address'];
          this._user.getNewLocation(location,endereco)
          .then( r =>{
            this.loader.dismiss();
          });
        })
        let mapOptions = {
          center: latLng,
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
          this._device.getAddressFromLocation(_loc)
          .then((address)=>{

            this.setAddressNew(address);
            let endereco = address['formatted_address'];
            this._user.getNewLocation(_loc,endereco);
          })
        });
        this.map.addListener('domready',e =>{
          console.log('mapread');
        });
      })
    }
    setAddressNew(address){
      this.address=address['formatted_address'];
      this.addressOptions=[];
      this.zone.run(()=>{});
    }
    addressChange(address){
      if(address.length >3){
        this._device.getLocationsWithAddres(address)
        .then((listAddress)=>{
          console.log('address->',listAddress['results']);
          this.addressOptions=listAddress['results'];
        })
      }
    }
    setAddress(address){
      this.address=address['formatted_address'];
      this.addressOptions=[];
      // new google.maps.LatLng(address, location[1]);
      this.map.setCenter(address['geometry'].location);
    }
    clearAddress(){
      this.address='';
      this.zone.run(()=>{});
    }




    openModal(){
      let loca={0:this.map.getCenter().lat(),1:this.map.getCenter().lng()}
      console.log('address que foi enviad->',this.address);
      let modal = this.modalCtrl.create(ModalMapPage,{"location":loca,"address":this.address});
      modal.present();
    }
  }
