import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the VoucherProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
      */
  @Injectable()
  export class VoucherProvider {

      constructor(public http: Http) {
          console.log('Hello VoucherProvider Provider');
      }


      getVoucher(){

      }

      applyVoucher(){

      }

  }
