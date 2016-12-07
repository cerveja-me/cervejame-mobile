import { Component } from '@angular/core';
import {LoginPage} from '../login/login';
import { MapPage } from '../map/map';
import { FinishPage } from '../finish/finish';

import { User } from '../../providers/user';
import { Sale } from '../../providers/sale';
import { Device } from '../../providers/device'


import {NavController, Platform, NavParams, ViewController,AlertController } from 'ionic-angular';

@Component({
  templateUrl: 'modal-map.html'
})
export class ModalMapPage {
  character;
  user;
  request;
  product;
  address;

  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController,
    public navCtrl: NavController,
    private alertCtrl:AlertController,
    private _user: User,
    private _sale:Sale,
    private _device:Device
    ) {
    this._sale.getProduct()
    .then( p=>{

      this.address=this.params.get("address");
      console.log('prod->',p,this.address);

      this.product=p;
      this._device.getDevice()
      .then(d =>{
        console.log('device->',d);
      })
    })
  }


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
    this._sale.getProduct()
    .then( p=>{
      this._user.getLoggedUser()
      .then( u =>{
        this._device.getDevice()
        .then( d =>{
          console.log('p->',p);
          console.log('u->',u);
          console.log('d->',d);
          this._sale.createSale({

            location:d['id'],
            device:d['device'],
            costumer:u['id'],
            payment:"money",
            product:{
              amount:p["amount"],
              id:p['id']
            }
          });

        })
      })
    })
  }
  doPrompt() {
    return new Promise((resolve, reject) => {
      let prompt = this.alertCtrl.create({
        title: 'Telefone para contato',
        message: "Para melhorar sua entrega, passa aí seu telefone.",
        inputs: [
        {
          name: 'phone',
          placeholder: 'Seu Telefone'
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
