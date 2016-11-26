
import { Component } from '@angular/core';


import { ModalController, Platform, NavParams, ViewController } from 'ionic-angular';

@Component({
  templateUrl: 'modal-receipt.html'
})
export class ModalContentPage {
  character;

  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController
    ) {  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
