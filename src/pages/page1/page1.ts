import { Component } from '@angular/core';
import { ModalController} from 'ionic-angular';
import { LoadingController } from 'ionic-angular';

import { ModalContentPage } from '../modal-receipt/modal-receipt';
import { ModalTourPage } from '../modal-tour/modal-tour';

import { User } from '../../providers/user';
import { Device } from '../../providers/device';
import { Sale } from '../../providers/sale';

@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html'
})
export class Page1 {
  products=[];
  loader = this._loading.create({
    content: this._device.getRandonLoading()
  });
  constructor(public modalCtrl: ModalController, private _device:Device, private _user:User, private _loading:LoadingController,private _sale:Sale) {

    _device.firstTimeApp()
    .then((res)=>{
      if(res){
        let modal = this.modalCtrl.create(ModalTourPage, {charNum: 0});
        modal.present();
      }
    }).catch((err)=>{
      console.log('err->',err);
    });
    this.loader.present();
    _user.createDevice()
    .then((res)=>{

      _user.getProducts()
      .then((_products)=>{
        console.log('res->',_products);
        if(_products['zone'] !=null){
          this.products=_products['products'];
        }else{
          this.products=[];
        }

        // console.log('products->', _products['products']);
        this.loader.dismiss();
      });
    });
  }
  sliderOptions = {
    slidesPerView:2,
    centeredSlides:true,
    loop:true
  };
  selectBeer(beer){
    let modal = this.modalCtrl.create(ModalContentPage,{'beer':beer});
    modal.present();
  }
}

