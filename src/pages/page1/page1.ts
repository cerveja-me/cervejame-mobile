import { Component } from '@angular/core';

import { LoadingController,AlertController ,ModalController,Platform} from 'ionic-angular';

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
  constructor(public modalCtrl: ModalController, private _device:Device, private _user:User, private _loading:LoadingController,private _sale:Sale,private alertCtrl:AlertController) {

    _device.firstTimeApp()
    .then((res)=>{
      if(res){
        let modal = this.modalCtrl.create(ModalTourPage, {charNum: 0});
        modal.present();
      }
    }).catch((err)=>{
      console.log('err->',err);
    });

    this.getProducts();
  }
  getProducts(){
    this.loader.present();
    this._device.createDevice()
    .then((res)=>{
      this.getProducts();
      this._user.getProducts()
      .then((_products)=>{
        if(_products['zone'] !=null){
          this.products=_products['products'];
        }else{
          this.products=[];
        }
        this.loader.dismiss();
      })
      .catch(e=>{
        this.doConfirm();
      });
    })
    .catch(e=>{
      console.log()
      this.doConfirm();
    });
  }
  doConfirm() {
    console.log('pelo menos entrou aqui');
    let confirm = this.alertCtrl.create({
      title: 'Use this lightsaber?',
      message: 'Do you agree to use this lightsaber to do good across the intergalactic galaxy?',
      buttons: [
      {
        text: 'Disagree',
        handler: () => {
          this.loader.dismiss();
          console.log('Disagree clicked');
        }
      },
      {
        text: 'Agree',
        handler: () => {
          this.getProducts();
          console.log('Agree clicked');
        }
      }
      ]
    });
    confirm.present();
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

