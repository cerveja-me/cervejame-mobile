import { Injectable } from '@angular/core';

import { NetworkProvider } from '../network/network';

@Injectable()
export class VoucherProvider {
  voucher;

  constructor(
    private network: NetworkProvider,
  ) {

  }

  getVoucher(voucher:string){
    console.log('voucher',voucher);
     return new Promise((resolve, reject)=> {
       this.network.get(this.network.c.VOUCHER+voucher)
       .then( (res)=> {
         console.log('teste->',res);
         this.applyVoucher(res);
         resolve(res);
       })
       .catch(reject);
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
