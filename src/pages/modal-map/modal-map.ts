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
      this.product=p;
    })
  }

  complete(){
    this.navCtrl.push(FinishPage);
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
  finishRequest(){
    this._user.getLoggedUser()
    .then((u)=>{
      this.user = u;
      if(this.user.costumer.phone!=null){
        this.completeSale();
      }else{
        this.doPrompt()
        .then((phone)=>{
          if(phone!=null){
            this.user.costumer.phone = phone;
            this._user.updateUser(this.user.costumer)
            .then((un)=>{
              this._user.getLoggedUser()
              .then(uu =>{
                uu['costumer']=un;
                this.user=uu;
                this._user.setLoggedUser(this.user);
                this.completeSale();
              })
            })
          }else{
            // this.completeSale();
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
          let csa=u['costumer'];
          this._sale.createSale({

            location:d['id'],
            device:d['device'],
            costumer:csa['id'],
            payment:"money",
            product:{
              amount:p["amount"],
              id:p['id']
            }
          })
          .then(r =>{
            this.complete();
          })
          .catch(e =>{
            console.log('erro ->', e);
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
