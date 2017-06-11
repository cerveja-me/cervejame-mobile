import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { DeviceProvider } from '../device/device';
import { UserProvider } from '../user/user';
import { OrderProvider } from '../../providers/order/order';


/*
  Generated class for the VoucherProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
    */
  @Injectable()
  export class VoucherProvider {
    voucher;
    constructor(
      private storage:Storage,
      public device:DeviceProvider,
      public order:OrderProvider,
      public user:UserProvider
      ) {
    }


    getVoucher(voucher:string){
      return new Promise((resolve, reject)=> {
        let order=this.order.getLocation();
        let user=this.user.getUser();
        let data={
          zone:order.zone,
          user:user?user.costumer.id:null,
          code:voucher
        }
        this.device.post(this.device.API+this.device.VOUCHER,data)
        .then(v=>{
          console.log('res->',v);
          if(v['err']!==null){
            resolve(v);
            this.applyVoucher(v);
          }else{
            reject(v['msg']);
          }
        })
      });
    }

    applyVoucher(v:any){
      this.voucher=v;
    }

    getSavedVoucher(){
      return this.voucher;
    }
    removeVoucher(){
      this.voucher=null;
    }

  }
