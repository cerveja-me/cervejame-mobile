import { Component, ViewChild, ElementRef  } from '@angular/core';

import { ModalMapPage } from '../modal-map/modal-map';
import { NavController, ModalController, Platform, NavParams } from 'ionic-angular';

import { Device } from '../../providers/device';
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

    constructor(public navCtrl: NavController, public modalCtrl:ModalController, private _device:Device) {}

    ionViewDidLoad() {
      this.loadMap();
    }

    loadMap(){
      this._device.getLocation()
      .then((location)=>{
        console.log('location->',location);
        let latLng = new google.maps.LatLng(location[0], location[1]);

        let mapOptions = {
          center: latLng,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }

        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      })
    }


    openModal(){
      let modal = this.modalCtrl.create(ModalMapPage);
      modal.present();
    }
  }
