import { Injectable } from '@angular/core';
import { Http,Response,Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {api} from './constants.ts';

import { Device } from './device';




/*
  Generated class for the User provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
    */
  @Injectable()
  export class User {
    items: Array<{}>;

    constructor(private _http: Http,private _device:Device){}

    createDevice(){
      return new Promise((resolve, reject) => {
        this._device.getPushToken()
        .then(device=>{
          let body = JSON.stringify({ "push_token":device});
          let headers = new Headers({ 'Content-Type': 'application/json'});
          let options = new RequestOptions({ headers: headers, method: "post" });
          this._http.post(api.URL+api.DEVICE, body,options)
          .toPromise()
          .then((res)=>{
            this._device.setDevice(res.json());
            resolve(res.json());
          })
          .catch(this.handleError);
        });
      });
    };

    getProducts(){
      return new Promise((resolve, reject) => {
        this._device.getDevice()
        .then((dev)=>{
          this._device.getLocation()
          .then((location)=>{

            let body = JSON.stringify({ "device":dev['id'],"location":location[0]+","+location[1]});
            let headers = new Headers({ 'Content-Type': 'application/json'});
            let options = new RequestOptions({ headers: headers, method: "post" });

            this._http.post(api.URL+api.LOCATION, body,options)
            .toPromise()
            .then((res)=>{
              this._device.setDevice(res.json());
              resolve(res.json());
            })
            .catch(this.handleError);
          })
        })
      });
    }



    private extractData(res: Response) {
      let body = res.json();
      this._device.setDevice(body.data);
      return body.data || { };
    }
    private handleError (error: Response | any) {
      console.log('err->',error);
    }



  }
