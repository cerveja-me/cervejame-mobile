import { Component } from '@angular/core';


import {NavController, Platform, NavParams, ViewController } from 'ionic-angular';

declare var UXCam:any;

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
    ) {
    UXCam.tagScreenName("modal-tour");
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
