
import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Device } from '@ionic-native/device';
import { AppVersion } from '@ionic-native/app-version';
import { Push, PushObject, PushOptions } from '@ionic-native/push';

import { Storage } from '@ionic/storage';

declare var UXCam:any;

/*
  Generated class for the DeviceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
    */
  @Injectable()
  export class DeviceProvider {


    constructor(
      public http: Http,
      public platform:Platform,
      public device:Device,
      public appVersion:AppVersion,
      public storage:Storage,
      public push: Push
      ) {
      if(this.platform.is('cordova')){
        UXCam.startWithKey("f7aa8dede567674");
        UXCam.tagUsersName(this.device.uuid);
      }
      this.createDevice('empty');
      if(this.device.platform==='Android'){
        this.startPush();
      }

    }
    createDevice(push:string){
      console.log('push->',push);
      var d = {
        other:this.device.manufacturer+' | '+this.device.serial,
        model:this.device.model,
        type:this.device.platform,
        id:this.device.uuid,
        appVersion:'',
        push_token:push ||'empty'
      }
      this.appVersion.getVersionNumber().then(v=>{
        d.appVersion=v;
        this.post(this.API+this.DEVICE,d);
      })
    }
    getDevice(){
      return this.device;
    }


    startPush(){
      var pushObject= this.push.init({
        android: {
          senderID: "10339294539",
          sound: 'true',
          icon:'icon'
        },
        ios: {
          senderID: "10339294539",
          alert: "true",
          badge: true,
          sound: 'true'
        }
      });
      pushObject.on('registration')
      .subscribe((registration: any) =>{
        console.log('Device registered', registration)
      } );



    }
    camPage(page){
      console.log('uxcam->',page);
      if(this.platform.is('cordova')){
        UXCam.tagScreenName(page);
      }
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
      return this.http.get(url).toPromise();
    }
    put(url,object){

    }

    API:string='http://api.cerveja.me/';

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

    phrases =[
    "Dinheiro não traz felicidade, mas compra cerveja, que é a mesma coisa.",
    "Não deixe pra amanhã a cerveja que você pode beber hoje.",
    "Se dirigir não beba, se beber chame o Cerveja.me!",
    "Nunca fiz um amigo bebendo leite.",
    "Diga-me com quem tu andas, que te direi quantas cervejas levar.",
    "Previsão do tempo: 100% propício para uma cerveja.",
    "O líquido mais precioso do mundo é a água, pois com ela dá pra fazer cerveja.",
    "Senhor, dai-me café para mudar o que posso e cerveja para mudar as que não posso.",
    "Aqui, Cerveja mais gelada que o coração do(a) ex.",
    "Cerveja é igual banho, tem que tomar todo dia."
    ];

    getRandonLoading(){
      return this.phrases[Math.floor(Math.random()*(this.phrases.length-0+1)+0)];
    }

  }
