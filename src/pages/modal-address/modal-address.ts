import { Component,ViewChild,NgZone } from '@angular/core';
import { ModalMapPage } from '../modal-map/modal-map';
import { FinishPage } from '../finish/finish';

import { Device } from '../../providers/device';
import { Analytics } from '../../providers/analytics';
import { Sale } from '../../providers/sale';
import { User } from '../../providers/user';


import {NavController, Platform, NavParams, ViewController,AlertController,ModalController } from 'ionic-angular';

@Component({
  selector: 'page-modal-address',
  templateUrl: 'modal-address.html'
})

export class ModalAddressPage {
  address;
  number;
  complement;
  fullAddress;
  addressOptions = [];
  product;
  payment='card';
  user;
  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController,
    public navCtrl: NavController,
    public modalCtrl : ModalController,
    private alertCtrl:AlertController,
    private _user: User,
    private _sale:Sale,
    private zone:NgZone,
    public _device : Device,
    private an:Analytics) {
    an.trackView('modal_address','none');
    this._sale.getProduct()
    .then( p=>{
      this.fullAddress=this.params.get("address");
      this.address=this.fullAddress.route;
      this.number=this.fullAddress.street_number;
    })
  }

  ionViewLoaded() {


  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
  confirm() {
    this.viewCtrl.dismiss({result:"teste"});
  }
  openModal(){
    let loca={0:-23,1:-48}
    let modal = this.modalCtrl.create(ModalMapPage,{"location":loca,"address":this.address+','+this.number+','+this.complement});
    modal.present();
  }

  setAddress(address){
    this.fullAddress=this._device.convertAddress(address);
    this.address=this.fullAddress.route;
    this.number=this.fullAddress.street_number;
    this.addressOptions=[];
    // new google.maps.LatLng(address, location[1]);
    // this.map.setCenter(address['geometry'].location);
  }

  addressChange(address){
    if(address.length >3){
      this._device.getLocationsWithAddres(address)
      .then((listAddress)=>{
        console.log('list->',listAddress);
        this.addressOptions=listAddress['results'];
      })
    }
  }
  increaseAmount(){
    this.an.button('increase_quantity_modal',this.product.zone,this.product.product.name,this.product.price);
    this.product.amount++;
    this.zone.run(()=>{});
  }
  decreaseAmount(){
    this.an.button('decrease_quantity_modal',this.product.zone,this.product.product.name,this.product.price);
    if(this.product.amount>1){
      this.product.amount--;
      this.zone.run(()=>{});
    }
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

  complete(){
    this.navCtrl.push(FinishPage);
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
