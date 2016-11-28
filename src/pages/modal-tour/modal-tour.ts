import { Component } from '@angular/core';

import {NavController, Platform, NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-modal-tour',
  templateUrl: 'modal-tour.html'
})

export class ModalTourPage {

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
