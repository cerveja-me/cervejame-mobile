import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MapPage } from '../map/map';
import { Facebook, NativeStorage } from 'ionic-native';

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

    constructor(public navCtrl: NavController) {}

    ionViewDidLoad() {

      console.log('Hello LoginPage Page');
    }

    gotomap(){
      this.navCtrl.push(MapPage);
    }
    doFbLogin(){
      let permissions = new Array();
      let nav = this.navCtrl;
      //the permissions your facebook app needs from the user
      permissions = ["public_profile"];


      Facebook.login(permissions)
      .then(function(response){
        let userId = response.authResponse.userID;
        let params = new Array();

        //Getting name and gender properties
        Facebook.api("/me?fields=name,gender", params)
        .then(function(user) {
          user.picture = "https://graph.facebook.com/" + userId + "/picture?type=large";
          //now we have the users info, let's save it in the NativeStorage
          NativeStorage.setItem('user',
          {
            name: user.name,
            gender: user.gender,
            picture: user.picture
          })
          .then(function(){
            // this.navCtrl.push(MapPage);
          }, function (error) {
            console.log(error);
          })
        })
      }, function(error){
        console.log(error);
      });
    }
  }
