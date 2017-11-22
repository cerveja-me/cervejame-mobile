// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { HttpClient } from '@angular/common/http';

import { DeviceProvider } from '../device/device';

declare var google;

@Injectable()
export class LocationProvider {

  constructor(
    private geolocation: Geolocation,
    private device: DeviceProvider,
    private http: HttpClient
  ) {
  }

  getPosition(){
    return new Promise((resolve, reject) => {
      this.geolocation.getCurrentPosition({enableHighAccuracy: true,timeout: 7000, maximumAge: 0})
      .then(pos=>{
        resolve(pos.coords)
      })
      .catch(err=>{
        let e={message:''};
        if(err.code==1){
          e.message='USER_DENIED_GEOLOCATION';
        }else{
          e.message='GEOLOCATION_TIMEOUT';
        }
        reject(e);
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
      let url =this.device.c.GOOGLE_ADDRESS.replace('#',location[0]+','+location[1]);
      this.http.get(url)
      .subscribe((res)=>{
        let add = res['results'];
        resolve(this.convertAddress(add[0]))
      }, (err) => {
        reject(err);
      });
    })
  }

  getLocationsWithAddres(address,location){
    return new Promise((resolve,reject) => {
      let url =this.device.c.GOOGLE_GEOCODE.replace('#',address);
      url = url.replace('LAT',location.lat());
      url = url.replace('LNG',location.lng());
      this.http.get(url)
      .subscribe((res)=>{
        resolve(res);
      }, (err) => {
        reject(err);
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
    return address.route+", "+address.street_number+", "+address.locality+", "+address.administrative_area_level_1;
  }
}
