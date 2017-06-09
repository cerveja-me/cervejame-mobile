import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the VoucherModalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
 @Component({
     selector: 'page-voucher-modal',
     templateUrl: 'voucher-modal.html',
 })
 export class VoucherModalPage {

     constructor(public navCtrl: NavController, public navParams: NavParams) {
     }

     ionViewDidLoad() {
         console.log('ionViewDidLoad VoucherModalPage');
     }

 }
