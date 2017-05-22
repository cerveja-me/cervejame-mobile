import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Geolocation } from '@ionic-native/geolocation';

/*
  Generated class for the GeolocationProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
      */
  @Injectable()
  export class GeolocationProvider {

      constructor(public http: Http, private geolocation: Geolocation) {
      }

      getPosition(){
          return new Promise((resolve, reject) => {
              this.geolocation.getCurrentPosition({enableHighAccuracy: true,timeout: 5000, maximumAge: 0})
              .then(pos=>{
                  console.log('position->',pos);
                  resolve(pos.coords)
              })
              .catch(err=>{
                  console.log('erro geo->', err);
                  reject(err);
              })
          })
      }
  }

