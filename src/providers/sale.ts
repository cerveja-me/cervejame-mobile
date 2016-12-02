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
      let obj ={
        product:p
      }
      this._storage.set('selected',obj);
    }
    getProduct(){
      return new Promise((resolve, reject) => {
        this._storage.get('selected')
        .then((prod)=>{
          console.log('product',prod);
          resolve(prod.product);
        });
      });

    }
    private api= {
      URL:"http://api.cerveja.me/",
      DEVICE:"device",
      LOCATION:"location",
      GOOGLE_GEOCODE:"https://maps.googleapis.com/maps/api/geocode/json?address=#&key=AIzaSyCviMvRgOLra4U-obeRi33K0Cur5WlGTQg",
      GOOGLE_ADDRESS:"https://maps.googleapis.com/maps/api/geocode/json?latlng=#&key=AIzaSyCviMvRgOLra4U-obeRi33K0Cur5WlGTQg"
    }


  }
