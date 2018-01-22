import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';

import { VoucherProvider } from  '../../providers/voucher/voucher';
import { DeviceProvider } from  '../../providers/device/device';

@Component({
  selector: 'page-modal-voucher',
  templateUrl: 'modal-voucher.html',
})
export class ModalVoucherPage {
  code:string;
  voucher_active:boolean=false;
  error_active:boolean=false
  vouch:any;
  closing=false;
  constructor(
    public viewCtrl: ViewController,
    public voucher: VoucherProvider,
    private device:DeviceProvider,
    private navParams:NavParams
  ) {
    
  }
  
  ionViewDidLoad() {
    this.device.camPage("voucher");
    this.code=this.navParams.get('voucher');
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
       this.voucher.getVoucher(this.code.replace('#','$'))
       .then(res=>{
        this.device.registerEvent('voucher_active', res);
         this.vouch=res;
         this.voucher_active=true;
         setTimeout(a=>{
           this.dismiss()
         },1500);
       })
       .catch(er=>{
        this.device.registerEvent('voucher_error', er);
        this.error_active=true
         this.voucher_active=false;
       })
     }else{
       this.voucher_active=false;
     }
   }

}
