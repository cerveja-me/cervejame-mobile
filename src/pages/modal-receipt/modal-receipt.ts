
import { Component } from '@angular/core';
import {LoginPage} from '../login/login';
import { MapPage } from '../map/map';


import {NavController, Platform, NavParams, ViewController } from 'ionic-angular';

@Component({
  templateUrl: 'modal-receipt.html'
})
export class ModalContentPage {
  character;

  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController,
    public navCtrl: NavController
    ) {  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
  gotomap(){
    this.navCtrl.push(LoginPage);
    console.log('aqui vai pro mapa');
  }
}
