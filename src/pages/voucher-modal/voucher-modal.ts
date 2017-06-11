import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { VoucherProvider } from  '../../providers/voucher/voucher';

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
     code:string;
     voucher_active:boolean=false;
     vouch:any;
     constructor(
         public navCtrl: NavController,
         public navParams: NavParams,
         public viewCtrl: ViewController,
         public voucher:VoucherProvider) {

     }

     ionViewDidLoad() {
         console.log('ionViewDidLoad VoucherModalPage');
     }

     dismiss() {
         setTimeout(() => {
             this.viewCtrl.dismiss();
         },300);
     }

     changecod(){
         if(this.code.length==9){
             this.voucher.getVoucher(this.code)
             .then(res=>{
                 this.vouch=res;
                 this.voucher_active=true;
             })
             .catch(er=>{
                 this.voucher_active=false;
             })
         }else{
             this.voucher_active=false;
         }
     }
 }
