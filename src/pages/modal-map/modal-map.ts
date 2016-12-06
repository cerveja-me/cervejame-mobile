import { Component } from '@angular/core';
import {LoginPage} from '../login/login';
import { MapPage } from '../map/map';
import { FinishPage } from '../finish/finish';

import { User } from '../../providers/user';
import { Sale } from '../../providers/sale';


import {NavController, Platform, NavParams, ViewController,AlertController } from 'ionic-angular';

@Component({
  templateUrl: 'modal-map.html'
})
export class ModalMapPage {
  character;
  user;
  request;

  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController,
    public navCtrl: NavController,
    private alertCtrl:AlertController,
    private _user: User,
    private _sale:Sale
    ) {  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
  finishRequest(){
    this._user.getLoggedUser()
    .then((u)=>{
      this.user = u;
      console.log('user_>>>> ', this.user.phone);
      if(this.user.phone!=null){
        this.completeSale();
      }else{
        this.doPrompt()
        .then((phone)=>{
          console.log('phone->',phone);
          if(phone!=null){
            console.log('com telefone');
            this.user.phone = phone;
            this._user.updateUser(this.user)
            .then((un)=>{
              this.user=un;
              this.completeSale();
            })
          }else{
            this.completeSale();
          }
        })
      }
    });
  }
  completeSale(){

  }
  doPrompt() {
    return new Promise((resolve, reject) => {
      let prompt = this.alertCtrl.create({
        title: 'Telefone',
        message: "Por favor, Informe-nos o seu telefone para que possamos entrar em contato caso ocorra algum problema com sua cerveja",
        inputs: [
        {
          name: 'phone',
          placeholder: 'telefone'
        },
        ],
        buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked', data);
            resolve(null);
          }
        },
        {
          text: 'Continuar',
          handler: data => {
            resolve(data.phone);
          }
        }
        ]
      });
      prompt.present();
    });
  }
}
