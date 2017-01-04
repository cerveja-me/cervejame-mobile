import { Component } from '@angular/core';
import { ModalMapPage } from '../modal-map/modal-map';

import {NavController, Platform, NavParams, ViewController,ModalController } from 'ionic-angular';

@Component({
  selector: 'page-modal-address',
  templateUrl: 'modal-address.html'
})

export class ModalAddressPage {
  address;
  number;
  complement;
  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController,
    public navCtrl: NavController,
    public modalCtrl : ModalController

    ) {  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
  openModal(){
    let loca={0:-23,1:-48}
    let modal = this.modalCtrl.create(ModalMapPage,{"location":loca,"address":this.address+','+this.number+','+this.complement});
    modal.present();
  }
}
