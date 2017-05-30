import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@Component({
    selector: 'page-notification-modal',
    templateUrl: 'notification-modal.html',
})
export class NotificationModalPage {

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad NotificationModalPage');
    }

}
