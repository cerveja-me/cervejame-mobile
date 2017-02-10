import { Component } from '@angular/core';

import { LoadingController,AlertController ,ModalController,Platform} from 'ionic-angular';

import { ModalContentPage } from '../modal-receipt/modal-receipt';
import { ModalTourPage } from '../modal-tour/modal-tour';
import { ModalNotificationPage } from '../modal-notification/modal-notification';
import { FeedbackPage } from '../feedback/feedback';

import { User } from '../../providers/user';
import { Device } from '../../providers/device';
import { Sale } from '../../providers/sale';
import { Analytics } from '../../providers/analytics';

@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html'
})
export class Page1 {
  products=[];
  startTime;
  loader = this._loading.create({
    content: this._device.getRandonLoading()
  });
  constructor(public modalCtrl: ModalController, private _device:Device,
    private _user:User,
    private _loading:LoadingController,
    private _sale:Sale,
    private alertCtrl:AlertController,
    private platform:Platform,
    private an:Analytics) {
    platform.ready().then((readySource) => {
      an.trackView('home','none');
      this.verifyFirstTime();
      this.verifySaleFeedback();

    });
  }
  verifySaleFeedback(){
    this._user.getSaleFeedBack()
    .then(sale=>{
      console.log('sale-->',sale);
      let feedbackModal = this.modalCtrl.create(FeedbackPage, {sale: sale});
      feedbackModal.present();
    })
  }

  verifyFirstTime(){
    this._device.firstTimeApp()
    .then((res)=>{
      if(res){
        let firstTimeModal = this.modalCtrl.create(ModalTourPage, {charNum: 0});
        firstTimeModal.present();
        firstTimeModal.onDidDismiss(a =>{
          this.verifyPush();
        })
      }else{
        this.verifyPush();
      }
    }).catch((err)=>{
      console.log('err->',err);
    });
  }
  verifyPush(){
    this._device.getFcmToken()
    .then(tk =>{
      if(tk){
        this.getProducts();
      }else{
        let notificationModal = this.modalCtrl.create(ModalNotificationPage, {charNum: 0});
        notificationModal.present();
        notificationModal.onDidDismiss(a =>{
          this.verifyPush();
        });
      }
    })
  }

  getProducts(){
    this.loader.present();
    this._device.createDevice()
    .then((res)=>{
      this._user.getProducts()
      .then((_products)=>{
        if(_products['zone'] !=null){
          this.products=_products['products'];
          this.startTime = new Date().getMilliseconds();
        }else{
          this.products=[];
        }
        this.loader.dismiss();
      })
      .catch(e=>{
        console.log('erro ao buscar produtos');
        this.loader.dismiss();
        this.doConfirm();
      });
    })
    .catch(e=>{
      console.log('erro ao criar device');
      this.loader.dismiss();
      this.doConfirm();
    });
  }
  doConfirm() {
    let confirm = this.alertCtrl.create({
      title: 'Ops!',
      message: 'Parece que tivemos um erro com o GPS ou a conexão com a internet!',
      buttons: [
      {
        text: 'Cancelar',
        handler: () => {
          this.loader.dismiss();
        }
      },
      {
        text: 'Tentar novamente',
        handler: () => {
          this.getProducts();
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
    let time =new Date().getMilliseconds()-this.startTime;
    this.an.time('TimeToChooseBeer',time,'','');
    this.an.button('selected_beer',beer.zone,beer.product.name,beer.price);
  }
}

