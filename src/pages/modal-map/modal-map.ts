import { Component } from '@angular/core';
import {LoginPage} from '../login/login';
import { MapPage } from '../map/map';
import { FinishPage } from '../finish/finish';
import { ModalAddressPage } from '../modal-address/modal-address';

import { User } from '../../providers/user';
import { Sale } from '../../providers/sale';
import { Device } from '../../providers/device'
import { Analytics } from '../../providers/analytics';


import {NavController,ModalController, Platform, NavParams, ViewController,AlertController } from 'ionic-angular';

@Component({
  templateUrl: 'modal-map.html'
})
export class ModalMapPage {
  character;
  user;
  request;
  product;
  address;
  payment='card';
  addressComplement='';
  readAddress='';
  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController,
    public navCtrl: NavController,
    private alertCtrl:AlertController,
    private _user: User,
    private _sale:Sale,
    private _device:Device,
    private an:Analytics) {
    an.trackView('modal_map','none');

    this._sale.getProduct()
    .then( p=>{
      this.address=this.params.get("address");
      console.log(this.address);
      this.readAddress=this.address.route;
      console.log(this.readAddress);
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
      if(this.user.costumer.phone!=null && 5>6){
        this.completeSale();
      }else{
        this.doPrompt()
        .then((data)=>{
          if(data){
            if(data['phone']!=null){
              this.user.costumer.phone = data['phone'];
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
              this.finishRequest();
            }
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
            address:this.address.route+", "+this.address.street_number+", "+this.addressComplement,
            location:d['id'],
            device:d['device'],
            costumer:csa['id'],
            payment:this.payment,
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
        title: 'Complemento',
        message: "Para melhorar sua entrega, passa aí seu compĺemento e telefone.",
        inputs: [
        {
          name: 'complement',
          placeholder: 'Complemento do endereço'
        },
        {
          name: 'phone',
          placeholder: 'Seu Telefone',
          value:this.user.costumer.phone
        }
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
            this.addressComplement=data.complement;
            resolve(data);
          }
        }
        ]
      });
      prompt.present();
    });
  }
}
