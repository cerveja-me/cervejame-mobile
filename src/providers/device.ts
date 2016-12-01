import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import {Geolocation} from 'ionic-native';

import {api} from './constants';
import {phrases} from './constants';

/*
  Generated class for the Device provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
    */
  @Injectable()
  export class Device {

    constructor(public http: Http,private storage:Storage) {}
    firstTimeApp(){
      let storage =new Storage();
      return new Promise((resolve, reject) => {
        storage.get('ftime')
        .then((val) => {
          if(val){
            resolve(false);
          }else{
            storage.set('ftime', 'false');
            resolve(true);
          }
        });
      });
    }

    getLocation(){
      return new Promise((resolve, reject) => {
        Geolocation.getCurrentPosition().then(pos => {
          let lat={};
          lat[0]=pos.coords.latitude;
          lat[1]=pos.coords.longitude;
          resolve(lat);
        });
      });
    }
    getAddressFromLocation(location){
      return new Promise((resolve, reject) => {
        let url =api.GOOGLE_ADDRESS.replace('#',location[0]+','+location[1]);
        this.http.get(url).toPromise()
        .then((res)=>{
          let add = res.json()['results'];
          resolve(add[0])
        });
      })
    }

    getLocationFromAddress(address){

    }


    getLocationsWithAddres(address){
      return new Promise((resolve, reject) => {
        let url =api.GOOGLE_GEOCODE.replace('#',address);
        this.http.get(url).toPromise()
        .then((res)=>{
          resolve(res.json());
        });
      })
    }

    getPushToken(){
      /*
      esse metodo vai verificar se já tem o token
      caso ele já exista ele retorna, se nao ele vai tentar gerar
      */
      return new Promise((resolve, reject) => {
        this.storage.get('fcmtoken')
        .then((val) => {
          if(val){
            resolve(val);
          }else{
            this.storage.set('fcmtoken', '9108390810ASDAAASDASD2938091829038901823');
            resolve('9108390810ASDAAASDASD2938091829038901823');
          }
        });
      });
    }
    setDevice(device){
      this.storage.set('device',device);
    }
    getDevice(){
      return new Promise((resolve, reject) => {
        this.storage.get('device')
        .then((val) => {
          resolve(val);
        });
      });
    }

    getRandonLoading():string{
      return phrases[Math.floor(Math.random()*(phrases.length-0+1)+0)];
    }
  }
