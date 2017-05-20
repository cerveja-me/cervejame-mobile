
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Device } from '@ionic-native/device';
import { AppVersion } from '@ionic-native/app-version';

import { Storage } from '@ionic/storage';


/*
  Generated class for the DeviceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
    */
  @Injectable()
  export class DeviceProvider {

    constructor(
      public http: Http,
      public device:Device,
      public appVersion:AppVersion
      ) {
      this.createDevice();
    }
    createDevice(){
      var d = {
        other:this.device.manufacturer+' | '+this.device.serial,
        model:this.device.model,
        type:this.device.platform,
        id:this.device.uuid,
        appVersion:''
      }
      this.appVersion.getVersionNumber().then(v=>{
        d.appVersion=v;
        this.post(this.API+this.DEVICE,d);
      })
    }

    post(url, object){
      return new Promise((resolve, reject)=> {

        var body = JSON.stringify(object);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        var options = new RequestOptions({ headers: headers, method: "post" });
        this.http.post(url, body,options)
        .toPromise()
        .then( (res)=> {
          // console.log(res);
          resolve(res.json());
        })
        .catch((err)=> {
          // console.log(err);
          reject(err);
        });
      });
    }
    get(url){

    }
    put(url,object){

    }

    API:string = 'http://192.168.0.144:1337/';
    // this.API = '  http://e101a380.ngrok.io/';

    DEVICE:string = 'v2/device/';
    AUTH:string='auth/login';
    LOCATION:string = 'location/';
    COSTUMER:string = 'costumer/';
    COSTUMER_UPDATE:string = 'update/';
    LASTBUY:string = 'lastbuy/';
    LASTBUYOPEN:string = 'lastbuyOpen/';
    SEND_FEEDBACK:string='sendfeedback/';
    SALE:string = 'sale/';
    GOOGLE_GEOCODE:string ='https://maps.googleapis.com/maps/api/geocode/json?address=#&rankby=distance&key=AIzaSyCviMvRgOLra4U-obeRi33K0Cur5WlGTQg';
    GOOGLE_ADDRESS:string = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=#&key=AIzaSyCviMvRgOLra4U-obeRi33K0Cur5WlGTQg';
    FIRSTIME:string = 'ftime';
    PUSH:string='fcm_token';
  }
