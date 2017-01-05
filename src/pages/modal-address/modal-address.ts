import { Component,Input,ViewChild } from '@angular/core';
import { ModalMapPage } from '../modal-map/modal-map';
import { Device } from '../../providers/device';

import {NavController, Platform, NavParams, ViewController,ModalController } from 'ionic-angular';

@Component({
  selector: 'page-modal-address',
  templateUrl: 'modal-address.html'
})

export class ModalAddressPage {
  address;
  number;
  complement;
  addressOptions = [];
  @ViewChild('input') addressInput ;

  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController,
    public navCtrl: NavController,
    public modalCtrl : ModalController,
    public _device : Device

    ) {

  }
  ionViewLoaded() {

    setTimeout(() => {
      this.address.setFocus();
    },150);

  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
  openModal(){
    let loca={0:-23,1:-48}
    let modal = this.modalCtrl.create(ModalMapPage,{"location":loca,"address":this.address+','+this.number+','+this.complement});
    modal.present();
  }

  setAddress(address){
    this.address=address['formatted_address'];
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
}
