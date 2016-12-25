import { Component } from '@angular/core';
import { Device } from '../../providers/device';


import {NavController, Platform, NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-modal-notification',
  templateUrl: 'modal-notification.html'
})

export class ModalNotificationPage {

  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController,
    public navCtrl: NavController,
    private _device : Device
    ) {  }

  accept() {
    //pegar os dados necessarios para o push
    this.viewCtrl.dismiss({push:true});
  }
  deny() {
    this._device.setFcmToken('userDeniedPush');
    this.viewCtrl.dismiss({push:false});
  }
}
