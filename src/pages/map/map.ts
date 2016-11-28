import { Component, ViewChild, ElementRef  } from '@angular/core';

import { ModalContentPage } from '../modal-receipt/modal-receipt';
import { NavController,ModalController, Platform, NavParams } from 'ionic-angular';

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

    constructor(public navCtrl: NavController, public modalCtrl:ModalController) {}

    // ionViewDidLoad() {
      //   let characterNum = {charNum: 0};
      //   // let modal = this.modalCtrl.create(ModalContentPage, characterNum);
      //   // modal.present();
      //   console.log('Hello MapPage Page');
      //   // this.openModal({charNum: 0});
      //   this.loadMap();
      // }
      ionViewLoaded(){
        this.loadMap();
      }

      loadMap(){

        let latLng = new google.maps.LatLng(-34.9290, 138.6010);

        let mapOptions = {
          center: latLng,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }

        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
        console.log('mapaaaa');
      }

      finishRequest(){
        // this.navCtrl.push(FinishPage);
      }
      openModal(characterNum){
        let modal = this.modalCtrl.create(ModalContentPage, characterNum);
        modal.present();
      }
    }
