import { Component } from '@angular/core';
import { NavController,ModalController } from 'ionic-angular';
import { MapPage } from '../map/map';
import { ModalRegisterPage } from '../modal-register/modal-register';
import { Facebook, NativeStorage } from 'ionic-native';


import { User } from '../../providers/user';
import { Device } from '../../providers/device';
import { Sale } from '../../providers/sale';

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

    constructor(
      public navCtrl: NavController,
      private modalCtrl:ModalController,
      private _user:User) {

    }

    ionViewDidLoad() {
      console.log('Hello LoginPage Page');
    }

    gotomap(){
      this.navCtrl.push(MapPage);
    }
    public registerUser(){


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

    }
    facebookRegister(){
      this.doFbLogin()
      .then((user)=>{
        this._user.facebookRegister(user)
        .then((result)=>{
          this.gotomap();
        })
      })
    }
    openModalRegister(){
      let modal = this.modalCtrl.create(ModalRegisterPage);
      modal.present();
      modal.onWillDismiss(f =>{
        console.log('willdismiss->',f);
      })
    }
  }
