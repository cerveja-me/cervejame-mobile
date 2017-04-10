import { Component } from '@angular/core';
import { Device } from '../../providers/device';
import { Analytics } from '../../providers/analytics';


import {NavController, Platform, NavParams, ViewController } from 'ionic-angular';

declare var Appsee:any;
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
    private _device : Device,
    private an:Analytics) {

    Appsee.startScreen('modal_notification');
    // an.trackView('modal_notification','none');
  }

  accept() {
    this._device.getPushToken()
    .then(token =>{
      if(token){
        this.viewCtrl.dismiss({push:true});
      }else{
        this._device.setFcmToken('userDeniedPush');
        this.viewCtrl.dismiss({push:false});
      }
    })
    .catch(e =>{
      this._device.setFcmToken('userDeniedPush');
      this.viewCtrl.dismiss({push:false});
    })
  }
  deny() {
    this._device.setFcmToken('userDeniedPush');
    this.viewCtrl.dismiss({push:false});
  }
}
