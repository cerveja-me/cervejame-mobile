import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the VoucherModalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
 @Component({
     selector: 'voucher-modal',
     templateUrl: 'voucher-modal.html',
 })
 export class VoucherModalPage {

     constructor(public navCtrl: NavController, public navParams: NavParams,
     public viewCtrl: ViewController) {
     
     }

     ionViewDidLoad() {
         console.log('ionViewDidLoad VoucherModalPage');
     }
     
    dismiss() {
        setTimeout(() => {
            this.viewCtrl.dismiss();
        },300);

    }

 }
