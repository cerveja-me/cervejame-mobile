import { Component,ViewChild,NgZone } from '@angular/core';
import {NavController, Platform, NavParams, ViewController,AlertController,ModalController } from 'ionic-angular';

import { ModalMapPage } from '../modal-map/modal-map';
import { FinishPage } from '../finish/finish';

import { Device } from '../../providers/device';
import { Analytics } from '../../providers/analytics';
import { Sale } from '../../providers/sale';
import { User } from '../../providers/user';



declare var Appsee:any;

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
  editing=false;
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

    Appsee.startScreen('modal_address');
    // an.trackView('modal_address','none');
    this._sale.getProduct()
    .then( p=>{
      this.fullAddress=this.params.get("address");
      this.address=this.fullAddress.route;
      this.number=this.fullAddress.street_number;
    })
  }
  focusOut() {
    let activeElement = <HTMLElement>document.activeElement;
    activeElement && activeElement.blur && activeElement.blur();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
  confirm() {
    this.viewCtrl.dismiss({address:this.address,number:this.number, complement:this.complement});
  }
  setAddress(address){
    this.fullAddress=this._device.convertAddress(address);
    this.address=this.fullAddress.route;
    this.number=this.fullAddress.street_number;
    this.addressOptions=[];
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
}
