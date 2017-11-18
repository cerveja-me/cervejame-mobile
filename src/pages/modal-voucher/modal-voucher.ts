import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

import { VoucherProvider } from  '../../providers/voucher/voucher';

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
    public voucher: VoucherProvider
  ) {
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
