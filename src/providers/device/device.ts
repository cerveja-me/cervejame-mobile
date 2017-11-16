import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Platform,Events,AlertController,ModalController } from 'ionic-angular';
import { Device } from '@ionic-native/device';
import { AppVersion } from '@ionic-native/app-version';

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
    public c:ConstantsProvider
  ) {
    this.createDevice('empty');
  }

  camPage(page){
    if(this.platform.is('cordova')){
      // UXCam.tagScreenName(page);
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
}
