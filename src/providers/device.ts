import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
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
      return new Promise((resolve, reject) => {
        this.storage.get('ftime')
        .then((val) => {
          if(val){
            resolve(false);
          }else{
            this.storage.set('ftime', 'false');
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
          this.setLocation(lat);
          resolve(lat);
        });
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
        let url =this.api.GOOGLE_ADDRESS.replace('#',location[0]+','+location[1]);
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
        let url =this.api.GOOGLE_GEOCODE.replace('#',address);
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
      return this.phrases[Math.floor(Math.random()*(this.phrases.length-0+1)+0)];
    }
    private phrases =[
    "Negociando gelo com o pé grande",
    "Dinheiro não traz felicidade, mas compra cerveja, que é a mesma coisa.",
    "Não deixe pra amanhã a cerveja que você pode beber hoje.",
    "Se dirigir não beba, se beber chame o Cerveja.me!",
    "Nunca fiz um amigo bebendo leite.",
    "Diga-me com quem tu andas, que te direi quantas cervejas levar.",
    "Previsão do tempo: 100% propício para uma cerveja.",
    "O líquido mais precioso do mundo é a água, pois com ela dá pra fazer cerveja.",
    "",
    "uma cerveja antes do almoço é muito bom para ficar pensando melhor",
    "Senhor, dai me café para mudar o que posso e cerveja para mudar as que não posso",
    "GELADAAAAAA",
    "Dinheiro não traz felicidade, mas compra cerveja, que é a mesma coisa"
    ]
    private api= {
      URL:"http://api.cerveja.me/",
      DEVICE:"device",
      LOCATION:"location",
      GOOGLE_GEOCODE:"https://maps.googleapis.com/maps/api/geocode/json?address=#&key=AIzaSyCviMvRgOLra4U-obeRi33K0Cur5WlGTQg",
      GOOGLE_ADDRESS:"https://maps.googleapis.com/maps/api/geocode/json?latlng=#&key=AIzaSyCviMvRgOLra4U-obeRi33K0Cur5WlGTQg"
    }


  }
