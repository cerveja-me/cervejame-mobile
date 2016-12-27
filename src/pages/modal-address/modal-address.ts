import { Component } from '@angular/core';

import {NavController, Platform, NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-modal-address',
  templateUrl: 'modal-address.html'
})

export class ModalAddressPage {

  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController,
    public navCtrl: NavController
    ) {  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
