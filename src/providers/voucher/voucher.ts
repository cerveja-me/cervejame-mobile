import { Injectable } from '@angular/core';

import { NetworkProvider } from '../network/network';
import { OrderProvider } from '../order/order';

@Injectable()
export class VoucherProvider {
  voucher;

  constructor(
    private network: NetworkProvider,
    private order: OrderProvider
  ) {

  }

  getVoucher(voucher:string){
     return new Promise((resolve, reject)=> {
       this.network.get(this.network.c.VOUCHER+voucher)
       .then( (res)=> {
         this.order.setVoucher(res);
         resolve(res);
       })
       .catch(reject);
     });
   }

}
