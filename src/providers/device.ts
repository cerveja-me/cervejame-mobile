import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import {Geolocation} from 'ionic-native';

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
      console.log('device->',device);
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

  }
