import { Component } from '@angular/core';
import { NavController,ModalController,AlertController,LoadingController } from 'ionic-angular';
import { MapPage } from '../map/map';
import { ModalRegisterPage } from '../modal-register/modal-register';
import { Facebook, NativeStorage } from 'ionic-native';

import { User } from '../../providers/user';
import { Device } from '../../providers/device';
import { Sale } from '../../providers/sale';

declare var UXCam:any;


/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
  */
  @Component({
    selector: 'page-login',
    templateUrl: 'login.html'
  })
  export class LoginPage {
    login = {
      email:'',
      password:''
    }
    loader = this._loading.create({
      content: this._device.getRandonLoading()
    });
    constructor(
      public navCtrl: NavController,
      private modalCtrl:ModalController,
      private _user:User,
      private _loading:LoadingController,
      private _device:Device,
      public alerCtrl: AlertController) {
      UXCam.tagScreenName("login");

    }

    ionViewDidLoad() {
      console.log('Hello LoginPage Page');
    }

    gotomap(){
      this.navCtrl.push(MapPage);
    }

    private doFbLogin(){
      return new Promise((resolve, reject) => {
        let permissions = new Array();

        //the permissions your facebook app needs from the user
        permissions = ["public_profile","email"];
        Facebook.login(permissions)
        .then(function(response){
          let userId = response.authResponse.userID;
          let params = new Array();

          //Getting name and gender properties
          Facebook.api("/me?fields=name,gender,email", params)
          .then(function(user) {
            user.picture = "https://graph.facebook.com/" + userId + "/picture?type=large";
            user.auth=response.authResponse;
            console.log('user->',user);
            resolve(user);
          })
        }, function(error){

          console.log('erro->',error);
          reject(error);
        });
      })
    }
    doLoginForm(){
      this.loader.present();
      this._user.loginUser(this.login)
      .then(u =>{
        this.loader.dismiss();
        if(u['err'] == null ){
          this._user.setLoggedUser(u);
        }else{
          let alert = this.alerCtrl.create({
            title: 'Dados Invalidos',
            message: 'Parece que você errou sua senha, cuidado quando for utilizar o aplicativo enquanto estiver alcoolizado.',
            buttons: ['Ok']
          });
          alert.present();
        }
      })

    }
    facebookRegister(){
      this.doFbLogin()
      .then((user)=>{
        this._user.facebookRegister(user)
        .then((result)=>{
          this._user.setLoggedUser(result);
          this.gotomap();
        })
      })
    }
    openModalRegister(){
      let modal = this.modalCtrl.create(ModalRegisterPage);
      modal.present();
      modal.onWillDismiss(f =>{
        if(f!=null){
          this.gotomap();
        }else{
          this._user.isUserLogged()
          .then(log=>{
            if(log){
              this.gotomap();
            }
          })
        }

      })
    }
  }
