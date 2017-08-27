
import { Injectable } from '@angular/core';
import { Platform,Events,AlertController,ModalController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Device } from '@ionic-native/device';
import { AppVersion } from '@ionic-native/app-version';
import { OneSignal } from '@ionic-native/onesignal';

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
      public events:Events,
      public alertCtrl:AlertController,
      public modalCtrl:ModalController,
      public device:Device,
      public appVersion:AppVersion,
      public storage:Storage,
      public oneSignal:OneSignal

      ) {
      if(this.platform.is('cordova')){
        // UXCam.startWithKey("335139d8e41417d");//admin@cerveja.me
        UXCam.tagUsersName(this.device.uuid);
        this.startOneSignal();
      }
      this.createDevice('empty');
    }
    createDevice(push:string){
      var d = {
        other:"onesignal",
        model:this.device.model,
        type:this.device.platform,
        id:this.device.uuid,
        appVersion:'',
        push_token:push ||'empty'
      }
      this.appVersion.getVersionNumber().then(v=>{
        d.appVersion=v;
        this.post(this.API+this.DEVICE,d)
        .then(res=>{
          console.log('response from device-> ',res);
        })
      })
    }
    getDevice(){
      return this.device;
    }


    startPush(){
      if(this.platform.is('cordova')){
        this.oneSignal.registerForPushNotifications();
        this.oneSignal.getIds()
        .then(res=>{
          this.createDevice(res.userId);
        })
      }
    }
    doAlert(data) {

    }
    camPage(page){
      if(this.platform.is('cordova')){
        UXCam.tagScreenName(page);
      }
    }
    startOneSignal(){
      var settings:any={kOSSettingsKeyAutoPrompt:false};
      this.oneSignal.iOSSettings(settings);
      this.oneSignal.startInit('5d5587e7-348c-4172-8a19-7e01c49daa2a', '10339294539');
      this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.None);

      this.oneSignal.handleNotificationReceived().subscribe((text) => {
        let alert = this.alertCtrl.create({
          title: text.payload.title,
          message: text.payload.body,
          buttons: ['Ok']
        });
        alert.onWillDismiss(data=>{
          if(text.payload.additionalData !==null){
            this.events.publish(text.payload.additionalData.action, text.payload);
          }
        })
        alert.present();
        console.log('received-> ',text.payload);
      });
      this.oneSignal.handleNotificationOpened().subscribe((text) => {
        // this.doAlert(text.notification.payload);
        console.log('Opened-> ',text.notification.payload);
      });
      this.oneSignal.getIds()
      .then(res=>{
        this.createDevice(res.userId);
        console.log('id->',res.userId,res.pushToken);
      })
      this.oneSignal.endInit();
    }
    oneSignalTag(tag:string,zone:string){
      if(this.platform.is('cordova')){
        this.oneSignal.sendTag(tag, zone);
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
          resolve(res.json());
        })
        .catch((err)=> {
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
    // API:string='http://192.168.0.144:1337/';
    DEVICE:string = 'v2/device/';
    AUTH:string='auth/login';
    LOCATION:string = 'location/';
    COSTUMER:string = 'costumer/';
    COSTUMER_UPDATE:string = 'update/';
    LASTBUY:string = 'lastbuy/';
    LASTBUYOPEN:string = 'lastbuyOpen/';
    SEND_FEEDBACK:string='sendfeedback/';
    SALE:string = 'sale/';
    GOOGLE_GEOCODE:string ='https://maps.googleapis.com/maps/api/geocode/json?address=#&location=LAT,LNG&rankby=distance&key=AIzaSyCviMvRgOLra4U-obeRi33K0Cur5WlGTQg';
    GOOGLE_ADDRESS:string = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=#&key=AIzaSyCviMvRgOLra4U-obeRi33K0Cur5WlGTQg';
    FIRSTIME:string = 'ftime';
    PUSH:string='fcm_token';
    VOUCHER:string='voucher/validate';

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
