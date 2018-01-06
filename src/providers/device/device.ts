import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Platform,Events,AlertController,ModalController } from 'ionic-angular';
import { Device } from '@ionic-native/device';
import { AppVersion } from '@ionic-native/app-version';
import { OneSignal } from '@ionic-native/onesignal';
import { NetworkProvider } from '../network/network';
import { ConstantsProvider } from '../constants/constants';
import { Storage } from '@ionic/storage';
import { UUID } from 'angular2-uuid';
import { Firebase } from '@ionic-native/firebase';
import { FirebaseDynamicLinks } from '@ionic-native/firebase-dynamic-links';


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
    private firebase:Firebase,
    private events:Events,
    private storage: Storage,
    private fbdlink:FirebaseDynamicLinks

  ) {
    this.createDevice('empty');
    this.getRemoteConfig();
    if(this.platform.is('cordova')){
      UXCam.startWithKey(this.c.UXCAM_KEY);
      UXCam.tagUsersName(this.device.uuid);
      this.startOneSignal();
    }
    fbdlink.onDynamicLink()
    .then((res: any) => console.log(res)) //Handle the logic here after opening the app with the Dynamic link
    .catch((error:any) => console.log(error));
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
        device_uuid: this.device.uuid,
        install_uuid: ''
      }

      this.storage.get('install_uuid')
      .then(install_uuid=>{
        if(install_uuid){
          d.install_uuid=install_uuid;
        }else{
          let uuid = UUID.UUID();
          d.install_uuid = uuid;
          this.firebase.setUserId(this.device.uuid)
          this.storage.set('install_uuid',uuid);
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
        this.firebase.getToken()
        .then(token => console.log(`The token is ${token}`)) // save the token server-side and use it to push notifications to this device
        .catch(error => console.error('Error getting token', error));
        this.firebase.onTokenRefresh()
        .subscribe((token: string) => console.log(`Got a new token ${token}`));
      
        this.createDevice(res.userId);
      })
    }
  }

  oneSignalTag(tag:string,zone:string){
    if(this.platform.is('cordova')){
      this.oneSignal.sendTag(tag, zone);
      this.firebase.setUserProperty(tag,zone);
    }
  }

  camPage(page){
    if(this.platform.is('cordova')){
      UXCam.tagScreenName(page);
      this.firebase.setScreenName(page);
    }
  }

  logError(e){
    this.firebase.logError(e);
  }
  getRemoteConfig(){
    this.firebase.fetch(60)
    .then(data=>{
      console.log('remote config-> ',data);
      this.firebase.activateFetched()
      .then(data1=>{
        console.log('data1->',data1);
        this.firebase.getValue('amount','cerveja-me')
        .then(data2=>{
          console.log('data2->',data2);
        })
      })
      
      
    })
  }

  registerEvent(event:string,data:any){
    if(this.platform.is('cordova')){
      this.firebase.logEvent(event,data);
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
