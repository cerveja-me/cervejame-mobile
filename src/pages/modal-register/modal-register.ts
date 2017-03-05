import { Component } from '@angular/core';
import {NavController, Platform, NavParams, ViewController,AlertController,LoadingController  } from 'ionic-angular';
import {LoginPage} from '../login/login';
import { MapPage } from '../map/map';

import { User } from '../../providers/user';
import { Device } from '../../providers/device';
import { Analytics } from '../../providers/analytics';
import { Facebook, NativeStorage } from 'ionic-native';


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
    public alerCtrl: AlertController,
    private an:Analytics) {
    an.trackView('modal_register','none');
  }

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
  facebookRegister(){
    this.doFbLogin()
    .then((user)=>{
      this._user.facebookRegister(user)
      .then((result)=>{
        this._user.setLoggedUser(result);
        this.dismiss();
      })
    })
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
}
