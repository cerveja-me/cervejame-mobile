import { Component } from '@angular/core';
import { ModalController, Platform, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';

import { ModalContentPage } from '../modal-receipt/modal-receipt';
import { ModalTourPage } from '../modal-tour/modal-tour';

import { User } from '../../providers/user';
import { Device } from '../../providers/device';



@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html'
})
export class Page1 {
  products=null;
  loader = this._loading.create({
    content: "Please wait..."
  });

  constructor(public modalCtrl: ModalController, private _device:Device, private _user:User, private _loading:LoadingController) {
    _device.firstTimeApp()
    .then((res)=>{
      if(res){
        let modal = this.modalCtrl.create(ModalTourPage, {charNum: 0});
        modal.present();
      }
    });
    this.loader.present();
    _user.createDevice()
    .then((res)=>{
      _user.getProducts()
      .then((_products)=>{
        this.loader.dismiss();
        this.products=_products['products'];
        console.log('products->', _products['products']);
      });
    });
  }
  sliderOptions = {
    slidesPerView:2,
    centeredSlides:true,
    loop:true
  };
  // presentLoading() {
    //   loader.present();
    // }
  openModal(characterNum){
    let modal = this.modalCtrl.create(ModalContentPage, characterNum);
    modal.present();
  }

}

