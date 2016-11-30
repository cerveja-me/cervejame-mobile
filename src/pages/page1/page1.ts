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
  products=[];
  loader = this._loading.create({
    content: "ta trincando"
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

        this.products=_products['products'];
        console.log('products->', _products['products']);
        this.loader.dismiss();
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
    selectBeer(beer){
      console.log('beer-> ',beer);

      // let modal = this.modalCtrl.create(ModalContentPage, characterNum);
      // modal.present();
    }

  }

