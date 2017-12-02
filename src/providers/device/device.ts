import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Platform,Events,AlertController,ModalController } from 'ionic-angular';
import { Device } from '@ionic-native/device';
import { AppVersion } from '@ionic-native/app-version';
import { OneSignal } from '@ionic-native/onesignal';
import { NetworkProvider } from '../network/network';
import { ConstantsProvider } from '../constants/constants';

declare var UXCam:any;

@Injectable()
export class DeviceProvider {
  dev:any;
  constructor(
    private platform:Platform,
    private device:Device,
    private appVersion:AppVersion,
    private net:NetworkProvider,
    public c:ConstantsProvider,
    public oneSignal:OneSignal,
    private alertCtrl:AlertController,
    private events:Events
  ) {
    this.createDevice('empty');

    if(this.platform.is('cordova')){
      UXCam.startWithKey("1ebb58d58ddf43e");//umux@cerveja.me
      UXCam.tagUsersName(this.device.uuid);
      this.startOneSignal();
    }
  }

  createDevice(push:string){
    return new Promise((resolve, reject)=> {
      var d = {
        id:'',
        push_token: push ||'empty',
        app_version: '2.0',
        app_name: 1,
        app_os: this.device.platform,
        phone_model: this.device.platform,
        device_uuid: this.device.uuid
      }

      this.appVersion.getVersionNumber().then(v=>{
        d.app_version=v;
        this.net.post(this.c.DEVICE,d)
        .then(r=>{
          this.dev=r;
          resolve(this.dev);
        })
        .catch(e=>{
          reject(e);
        })
      })
    })
  }

  createAlertPush(title,body){
    let alert = this.alertCtrl.create({
      title: title,
      message: body,
      buttons: ['Ok']
    });

    alert.present();
  }

  startOneSignal(){
    var settings:any={kOSSettingsKeyAutoPrompt:false};
    this.oneSignal.iOSSettings(settings);
    this.oneSignal.startInit('5d5587e7-348c-4172-8a19-7e01c49daa2a', '10339294539');
    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.None);

    this.oneSignal.handleNotificationReceived()
    .subscribe((text) => {
      if(text.payload['additionalData']){
        this.events.publish(text.payload['additionalData']['action'],'update');
      }
      this.createAlertPush(text.payload['title'],text.payload['body'])
    });
    this.oneSignal.handleNotificationOpened()
    .subscribe((text) => {
      if(text.notification.payload['additionalData']){
        this.events.publish(text.notification.payload['additionalData']['action'],'update');
      }
    });
    this.oneSignal.getIds()
    .then(res=>{
      this.createDevice(res.userId);
    })
    this.oneSignal.endInit();
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

  oneSignalTag(tag:string,zone:string){
    if(this.platform.is('cordova')){
      this.oneSignal.sendTag(tag, zone);
    }
  }

  camPage(page){
    if(this.platform.is('cordova')){
      UXCam.tagScreenName(page);
    }
  }

  getDevice(){
    return new Promise((resolve, reject)=> {
      if(this.dev){
        resolve(this.dev);
      }else{
        this.createDevice('empty')
        .then((d)=>{
          resolve(this.dev);
        })
        .catch( e=>{
          reject(e);
        })
      }
    })

  }

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
