import { Injectable } from '@angular/core';
import { Http,Response,Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Storage } from '@ionic/storage';

import { Device } from './device';

/*
  Generated class for the User provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
    */
  @Injectable()
  export class User {
    items: Array<{}>;

    constructor(private _http: Http,private _device:Device,private _storage:Storage){}

    createDevice(){
      return new Promise((resolve, reject) => {
        this._device.getPushToken()
        .then(device=>{
          let body = JSON.stringify({ "push_token":device});
          let headers = new Headers({ 'Content-Type': 'application/json'});
          let options = new RequestOptions({ headers: headers, method: "post" });
          this._http.post(this.api.URL+this.api.DEVICE, body,options)
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

            this._http.post(this.api.URL+this.api.LOCATION, body,options)
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

    isUserLogged(){
      this.getLoggedUser()
      .then((user)=>{
        if(user){
          return true;
        }else{
          return false;
        }
      });
    }
    setLoggedUser(user){
      this._storage.set('user_logged',user);
    }

    getLoggedUser(){
      return new Promise((resolve, reject) => {
        this._storage.get('user_logged')
        .then((user)=>{
          resolve(user);
        });
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
    private api= {
      URL:"http://api.cerveja.me/",
      DEVICE:"device",
      LOCATION:"location",
      GOOGLE_GEOCODE:"https://maps.googleapis.com/maps/api/geocode/json?address=#&key=AIzaSyCviMvRgOLra4U-obeRi33K0Cur5WlGTQg",
      GOOGLE_ADDRESS:"https://maps.googleapis.com/maps/api/geocode/json?latlng=#&key=AIzaSyCviMvRgOLra4U-obeRi33K0Cur5WlGTQg"
    }




  }
