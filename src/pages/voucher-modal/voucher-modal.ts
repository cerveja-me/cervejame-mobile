import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

import { VoucherProvider } from  '../../providers/voucher/voucher';
import { DeviceProvider } from '../../providers/device/device';

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
   error_active:boolean=false
   vouch:any;
   closing=false;

   constructor(
     public navCtrl: NavController,
     public navParams: NavParams,
     public device:DeviceProvider,
     public viewCtrl: ViewController,
     public voucher:VoucherProvider) {

   }

   ionViewDidLoad() {
     this.device.camPage('voucher-modal');
     this.closing=false;
   }

   dismiss() {
     this.closing=true;
     setTimeout(() => {
       this.viewCtrl.dismiss();
     },300);
   }

   changecod(){
     this.error_active=false;
     if(this.code.length==9){
       this.voucher.getVoucher(this.code)
       .then(res=>{
         this.vouch=res;
         this.voucher_active=true;
         setTimeout(a=>{
           this.dismiss()
         },1500);
       })
       .catch(er=>{
         this.error_active=true
         this.voucher_active=false;
       })
     }else{
       this.voucher_active=false;
     }
   }
 }
