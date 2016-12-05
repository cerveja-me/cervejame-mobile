import { Component } from '@angular/core';
import {LoginPage} from '../login/login';
import { MapPage } from '../map/map';
import { FinishPage } from '../finish/finish';


import {NavController, Platform, NavParams, ViewController,AlertController } from 'ionic-angular';

@Component({
  templateUrl: 'modal-map.html'
})
export class ModalMapPage {
  character;

  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController,
    public navCtrl: NavController,
    private alertCtrl:AlertController
    ) {  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
  finishRequest(){
    this.navCtrl.push(FinishPage);
  }

  doPrompt() {
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

        }
      },
      {
        text: 'Continuar',
        handler: data => {
          console.log('Saved clicked->',data);
        }
      }
      ]
    });
    prompt.present();
  }
}
