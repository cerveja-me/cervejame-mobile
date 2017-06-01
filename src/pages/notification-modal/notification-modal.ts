import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { DeviceProvider } from '../../providers/device/device';

@Component({
  selector: 'page-notification-modal',
  templateUrl: 'notification-modal.html',
})
export class NotificationModalPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl:ViewController,
    public device:DeviceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationModalPage');
  }

  accept(){
    this.device.startPush();
    setTimeout(() => {
      this.viewCtrl.dismiss();
    },300);
  }

}
