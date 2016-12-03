import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MapPage } from '../map/map';
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

    constructor(public navCtrl: NavController, private _user:User) {}

    ionViewDidLoad() {

      console.log('Hello LoginPage Page');
    }

    gotomap(){
      this.navCtrl.push(MapPage);
    }
    doFbLogin(){
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
          this._user.registerUser(user)
          .then((result)=>{
            if(this._user.isUserLogged()){
              this.gotomap();
            }else{
              console.log("its somethig wrong");
            }
          })
        })
      }, function(error){
        console.log(error);
      });
    }
  }
