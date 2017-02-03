import { Injectable } from '@angular/core';
import { Http,Response,Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import {Geolocation, Push} from 'ionic-native';
import {Platform,AlertController} from 'ionic-angular';

import {ConstantService} from './constant-service';


/*
  Generated class for the Device provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
    */
  @Injectable()
  export class Device {


    constructor(
      public http: Http,
      private storage:Storage,
      private platform:Platform,
      private cs :ConstantService,
      private _http:Http,
      private alerCtrl: AlertController) {}

    firstTimeApp(){
      return new Promise((resolve, reject) => {
        this.storage.get(this.cs.FIRSTIME)
        .then((val) => {
          if(val){
            resolve(false);
          }else{
            this.storage.set(this.cs.FIRSTIME, 'false');
            resolve(true);
          }
        });
      });
    }

    getFcmToken(){
      return new Promise((resolve, reject) => {
        this.storage.get(this.cs.PUSH)
        .then(tk =>{
          if(tk != null){
            resolve(tk);
          }else{
            resolve(false);
          }
        })
      })
    }

    setFcmToken(token){
      this.storage.set(this.cs.PUSH,token);
    }

    createDevice(){
      return new Promise((resolve, reject) => {
        this.getPushToken()
        .then(device=>{
          let pat = { type:'',push_token:device};
          if(this.platform.is('ios')){
            pat.type='ios';
          }else{
            pat.type='android';
          }
          let body = JSON.stringify(pat);
          let headers = new Headers({ 'Content-Type': 'application/json'});
          let options = new RequestOptions({ headers: headers, method: "post" });
          this._http.post(this.cs.API+this.cs.DEVICE, body,options)
          .toPromise()
          .then( res =>{
            this.setDevice(res.json());
            resolve(res.json());
          })
          .catch(err=>{
            reject(err);
          });
        })
        .catch(err=>{
          reject(err);
        });
      });
    };
    getLocation(){
      return new Promise((resolve, reject) => {
        if(this.platform.is('cordova')){
          this.platform.ready().then(() => {
            let opt = {
              enableHighAccuracy: true,
              timeout: 20000,
              maximumAge: 0
            };
            Geolocation.getCurrentPosition(opt)
            .then((pos) => {
              let lat={};
              lat[0]=pos.coords.latitude;
              lat[1]=pos.coords.longitude;
              this.setLocation(lat);
              resolve(lat);
            })
            .catch(e=>{
              reject();
            });
          });
        }else{
          let opt = {
            enableHighAccuracy: true,
            timeout: 20000,
            maximumAge: 0
          };
          Geolocation.getCurrentPosition(opt)
          .then((pos) => {
            let lat={};
            lat[0]=pos.coords.latitude;
            lat[1]=pos.coords.longitude;
            console.log(lat);
            this.setLocation(lat);
            resolve(lat);
          })
          .catch(e=>{
            reject();
          });
        }


      });
    }
    setLocation(location){

    }
    getStoredLocation(){
      return new Promise((resolve, reject) => {

      })
    }
    getAddressFromLocation(location){
      return new Promise((resolve, reject) => {
        let url =this.cs.GOOGLE_ADDRESS.replace('#',location[0]+','+location[1]);
        this.http.get(url).toPromise()
        .then((res)=>{
          let add = res.json()['results'];
          resolve(add[0])
        });
      })
    }

    getLocationsWithAddres(address){
      return new Promise((resolve, reject) => {
        let url =this.cs.GOOGLE_GEOCODE.replace('#',address);
        this.http.get(url).toPromise()
        .then((res)=>{
          resolve(res.json());
        });
      })
    }
    doAlert(data) {
      let alert = this.alerCtrl.create({
        title: data.title,
        message: data.message,
        buttons: ['Ok']
      });
      alert.present()
    }
    /** esse metodo vai verificar se já tem o token caso ele já exista ele retorna, se nao ele vai tentar gerar*/
    getPushToken(){
      return new Promise((resolve, reject) => {
        if(this.platform.is('cordova')){
          var push = Push.init({
            android: {
              senderID: "10339294539",
              sound: 'false',
              icon:'icon'
            },
            ios: {
              senderID: "10339294539",
              alert: "true",
              badge: true,
              sound: 'false'
            }
          });
          push.on('registration', (data) => {
            this.setFcmToken(data.registrationId);
            resolve(data.registrationId);
          });
          push.on('notification', (data) => {
            this.doAlert(data);
          });
          push.on('error', (e) => {
            reject(e);
          });
        }else{
          this.setFcmToken('developmenttoken');
          resolve('developmenttoken');
        }
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
      return address;
    }
    formatAddress(address){
      return address.route+","+address.street_number+","+address.locality+","+address.administrative_area_level_1;
    }
    private handleError (error: Response | any) {
      console.log('err->',error);

    }

    getRandonLoading():string{
      return this.phrases[Math.floor(Math.random()*(this.phrases.length-0+1)+0)];
    }
    private phrases =[
    "Negociando gelo com o pé grande.",
    "Dinheiro não traz felicidade, mas compra cerveja, que é a mesma coisa.",
    "Não deixe pra amanhã a cerveja que você pode beber hoje.",
    "Se dirigir não beba, se beber chame o Cerveja.me!",
    "Nunca fiz um amigo bebendo leite.",
    "Diga-me com quem tu andas, que te direi quantas cervejas levar.",
    "Previsão do tempo: 100% propício para uma cerveja.",
    "O líquido mais precioso do mundo é a água, pois com ela dá pra fazer cerveja.",
    "Senhor, dai-me café para mudar o que posso e cerveja para mudar as que não posso.",
    "GELADAAAAAA!",
    "Nã Nã Nã",
    "Aqui, Cerveja mais gelada que o coração do(a) ex."
    ]
  }
