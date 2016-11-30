import { Injectable } from '@angular/core';
import { Http,Response,Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Storage } from '@ionic/storage';

import { Device } from './device';
/*
  Generated class for the Sale provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
    */
  @Injectable()
  export class Sale {

    constructor(public http: Http, private _storage:Storage, _device:Device) {}

    setProduct(p){
      this._storage.set('selected', p);
    }
    getProduct(){
      return this._storage.get('selected');
    }
  }
