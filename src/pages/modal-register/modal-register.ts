import { Component } from '@angular/core';
import {NavController, Platform, NavParams, ViewController,AlertController,LoadingController  } from 'ionic-angular';
import {LoginPage} from '../login/login';
import { MapPage } from '../map/map';

import { User } from '../../providers/user';
import { Device } from '../../providers/device';
/*
  Generated class for the ModalRegister page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
  */
  @Component({
    templateUrl: 'modal-register.html'
  })
  export class ModalRegisterPage {
    register={
      name:'',
      email:'',
      password:''
    }

    loader = this._loading.create({
      content: this._device.getRandonLoading()
    });
    constructor(
      public platform: Platform,
      public params: NavParams,
      public viewCtrl: ViewController,
      public navCtrl: NavController,
      private _user:User,
      private _loading:LoadingController,
      private _device:Device,
      public alerCtrl: AlertController) {}

    ionViewDidLoad() {

    }
    createUser(){
      this.loader.present();
      this._user.createUser(this.register)
      .then(re =>{

        if(re['err']==null){

          this._user.setLoggedUser(re);

          this.loader.dismiss();
          this.navCtrl.push(MapPage);

          this.dismiss();
        }else{
          this.loader.dismiss();
          console.log('cadastro com sucesso ->',re);
        }
      })
    }

    dismiss() {
      this.viewCtrl.dismiss();
    }

  }
