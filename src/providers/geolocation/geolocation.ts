import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Geolocation } from '@ionic-native/geolocation';
import { DeviceProvider } from '../device/device';

declare var google;

/*
  Generated class for the GeolocationProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
    */
  @Injectable()
  export class GeolocationProvider {

    constructor(
      public http: Http,
      public device:DeviceProvider,
      private geolocation: Geolocation
      ) {
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
    getMap(){
      return new Promise((resolve, reject) => {
        this.getPosition()
        .then(pos=>{
          let latLng = new google.maps.LatLng(pos['latitude'],pos['longitude']);
          var mapOptions = {
            clickableIcons:false,
            disableDoubleClickZoom:true,
            fullscreenControl:false,
            panControl:false,
            rotateControl:false,
            scaleControl:false,
            scrollwheel  :false,
            signInControl:false,
            streetViewControl:false,
            zoomControl:false,
            mapTypeControl:false,
            zoom: 17,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            center:latLng
          }
          resolve(mapOptions);
        })
        .catch(reject);
      });
    }

    getAddressFromLocation(location){
      return new Promise((resolve, reject) => {
        let url =this.device.GOOGLE_ADDRESS.replace('#',location[0]+','+location[1]);
        this.http.get(url).toPromise()
        .then((res)=>{
          let add = res.json()['results'];
          resolve(this.convertAddress(add[0]))
        })
        .catch(e=>{
          reject(e)
        });
      })
    }

    getLocationsWithAddres(address){
      return new Promise((resolve, reject) => {
        let url =this.device.GOOGLE_GEOCODE.replace('#',address);
        this.http.get(url).toPromise()
        .then((res)=>{
          resolve(res.json());
        })
        .catch(e=>{
          reject(e);
        });
      })
    }

    convertAddress(place){
      let  componentForm = {
        street_number: 'short_name',
        route: 'long_name',
        locality: 'long_name',
        administrative_area_level_1: 'short_name',
        country: 'long_name',
        postal_code: 'short_name'
      };
      let address={};
      for (var i = 0; i < place.address_components.length; i++) {
        var addressType = place.address_components[i].types[0];
        if (componentForm[addressType]) {
          var val = place.address_components[i][componentForm[addressType]];
          address[addressType]=val;
        }
      }
      address['formated']=this.formatAddress(address);
      return(address);
    }
    formatAddress(address){
      return address.route+","+address.street_number+","+address.locality+","+address.administrative_area_level_1;
    }

  }

