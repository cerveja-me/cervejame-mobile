import { Component } from '@angular/core';
import {NavController, Platform, NavParams, ViewController } from 'ionic-angular';
import {LoginPage} from '../login/login';
/*
  Generated class for the ModalRegister page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
  */
  @Component({
    templateUrl: 'modal-register.html'
  })
  export class ModalRegisterPage {

    constructor(
      public platform: Platform,
      public params: NavParams,
      public viewCtrl: ViewController,
      public navCtrl: NavController) {}

    ionViewDidLoad() {
      console.log('Hello ModalRegisterPage Page');
    }

    dismiss() {
      this.viewCtrl.dismiss();
    }

  }
