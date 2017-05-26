import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';

import { DeviceProvider } from '../../providers/device/device';

@Component({
    selector: 'page-schedule-modal',
    templateUrl: 'schedule-modal.html',
})
export class ScheduleModalPage {
    hours;
    closed;
    day = new Date().getDay();

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public viewCtrl: ViewController,
        public device:DeviceProvider
        ) {
    }

    ionViewDidLoad() {
        this.device.camPage('schedule');
        this.hours= this.navParams.get("hours");
        this.closed= this.navParams.get("closed");
    }
    dismiss() {
        this.viewCtrl.dismiss();
    }

}

