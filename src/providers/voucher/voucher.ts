import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { DeviceProvider } from '../device/device';

/*
  Generated class for the VoucherProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
    */
  @Injectable()
  export class VoucherProvider {

    constructor(
      private storage:Storage,
      public device:DeviceProvider
      ) {
    }


    getVoucher(voucher:string){
      return new Promise((resolve, reject)=> {
        this.device.get(this.device.API+this.device.VOUCHER+voucher)
        .then(v=>{
          let vc =Array.from( v.json());
          let vouch:any;
          if(vc.length>0){
            vouch=vc[0];
            this.applyVoucher(vouch);
            if(vouch.active){
              resolve(vouch);
            }else{
              reject("Este cupom já encerrou");
            }
          }else{
            reject("Cupom não encontrado");
          }
        })
      });
    }

    applyVoucher(v:any){
      this.storage.set('voucher_active',v);

    }
    getSavedVoucher(){
      return new Promise((resolve, reject) => {
        this.storage.get('voucher_active')
        .then((v)=>{
          resolve(v);
        });
      });
    }
    removeVoucher(){
      this.storage.remove('voucher_active');
    }

  }
