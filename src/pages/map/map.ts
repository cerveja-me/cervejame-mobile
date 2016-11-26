import { Component } from '@angular/core';
// import { ModalContentPage } from '../modal-receipt/modal-receipt';
import {ModalController, NavController } from 'ionic-angular';
import {FinishPage} from '../finish/finish';
import { ModalContentPage } from '../modal-receipt/modal-receipt';



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

    constructor(public navCtrl: NavController, public modalCtrl:ModalController) {}

    ionViewDidLoad() {
      let characterNum = {charNum: 0};
      // let modal = this.modalCtrl.create(ModalContentPage, characterNum);
      // modal.present();
      console.log('Hello MapPage Page');
    }

    finishRequest(){
      this.navCtrl.push(FinishPage);
    }
  }
