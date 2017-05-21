import { Component } from '@angular/core';

import { LoadingController,AlertController ,ModalController,Platform,Events} from 'ionic-angular';

import { ModalContentPage } from '../modal-receipt/modal-receipt';
import { ModalTourPage } from '../modal-tour/modal-tour';
import { ModalNotificationPage } from '../modal-notification/modal-notification';
import { FeedbackPage } from '../feedback/feedback';
import { ModalSchedulePage } from '../modal-schedule/modal-schedule';
import { FinishPage } from '../finish/finish';

import { User } from '../../providers/user';
import { Device } from '../../providers/device';
import { Sale } from '../../providers/sale';

import { EmailComposer } from 'ionic-native';
declare var UXCam:any;


@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html'
})
export class Page1 {
  products=[];
  startTime;
  sale:any;
  closed=false;
  hours;
  loadedcompleted=false;
  loader = this._loading.create({
    content: this._device.getRandonLoading()
  });
  constructor(
    public modalCtrl: ModalController,
    private _device:Device,
    private _user:User,
    private _loading:LoadingController,
    private _sale:Sale,
    private alertCtrl:AlertController,
    private platform:Platform,
    public events: Events) {

    if(platform.is('cordova')){
      UXCam.tagScreenName("home");
    }


    this.platform.ready().then((readySource) => {


      this.verifyFirstTime();
      this.verifySaleFeedback();
      this.verifyLastSale();
      this.events.subscribe('push:order_update', data=>{
        this.verifySaleFeedback();
        this.verifyLastSale();
      })
    });
  }

  verifyLastSale(){
    this._user.getLastSale()
    .then(sale=>{
      // console.log('asda');
      if(sale){
        this.sale=sale;
      }
    })
    .catch(e=>{

    })
  }

  openSchedule(){
    let modal = this.modalCtrl.create(ModalSchedulePage,{hours:this.hours, closed:this.closed});
    modal.present();

  }

  openSale(){
    let modal = this.modalCtrl.create(FinishPage,{hours:this.hours});
    modal.present();

  }

  verifySaleFeedback(){
    this._user.getSaleFeedBack()
    .then(sale=>{
      //console.log('salefeedocabk->',sale);
      if(sale){
        let feedbackModal = this.modalCtrl.create(FeedbackPage, {sale: sale});
        feedbackModal.present();
      }
    })
    .catch(e=>{

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
      //console.log('err->',err);
    });
  }
  verifyPush(){
    this._device.getFcmToken()
    .then(tk =>{
      if(tk){
        this.getProducts();
      }else{
        if(this.platform.is('ios')){
          let notificationModal = this.modalCtrl.create(ModalNotificationPage, {charNum: 0});
          notificationModal.present();
          notificationModal.onDidDismiss(a =>{
            this.verifyFirstTime();
          });
        }else{
          this._device.getPushToken()
          .then(token =>{
            this.verifyFirstTime();
          });
        }
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
          var closedtime = JSON.parse(_products["schedule"]);
          this.hours =closedtime;
          var d=new Date();
          if(d.getHours() > closedtime[d.getDay()].start && d.getHours() < closedtime[d.getDay()].end){
            this.closed = true;
          }
          this.products=_products['products'];
          this.startTime = new Date().getMilliseconds();
        }else{
          this.products=[];
        }
        var d=new Date();
        this.loader.dismiss();
        this.loadedcompleted=true;
      })
      .catch(e=>{
        this.loader.dismiss();
        this.doConfirm();
      });
    })
    .catch(e=>{
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
    this.verifySaleFeedback();
  }

}

