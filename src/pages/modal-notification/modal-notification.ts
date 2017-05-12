import { Component } from '@angular/core';
import { Device } from '../../providers/device';

import {NavController,LoadingController, Platform, NavParams, ViewController } from 'ionic-angular';
declare var UXCam:any;

@Component({
  selector: 'page-modal-notification',
  templateUrl: 'modal-notification.html'
})

export class ModalNotificationPage {

  loader = this._loading.create({
    content: this._device.getRandonLoading()
  });
  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController,
    private _loading:LoadingController,

    public navCtrl: NavController,
    private _device : Device) {

    if(this.platform.is('cordova')){
      UXCam.tagScreenName("modal-notification");
    }
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
