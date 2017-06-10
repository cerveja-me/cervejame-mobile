import { Component,ViewChild,NgZone } from '@angular/core';
import { NavController,NavParams, Slides,ModalController,LoadingController,Events} from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { DeviceProvider } from '../../providers/device/device';
import { GeolocationProvider } from '../../providers/geolocation/geolocation';
import { OrderProvider } from '../../providers/order/order';

//relatedPages
import { HomeConfirmModalPage } from '../home-confirm-modal/home-confirm-modal';
import { ScheduleModalPage } from '../schedule-modal/schedule-modal';
import { StatusModalPage } from '../status-modal/status-modal';
import { FeedbackModalPage } from '../feedback-modal/feedback-modal';
import { NotificationModalPage } from '../notification-modal/notification-modal';
import { VoucherModalPage } from '../voucher-modal/voucher-modal';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  hours:{};
  closed:boolean;
  products:any=[];
  @ViewChild(Slides) slides: Slides;
  loadedcompleted;
  err:string;
  sale;
  taped=false;
  constructor(
    public navCtrl: NavController,
    public params:NavParams,
    public zone:NgZone,
    public events:Events,
    public storage:Storage,
    public load:LoadingController,
    public device:DeviceProvider,
    public order:OrderProvider,
    public modalCtrl: ModalController
    ) {
    this.events.subscribe('push:order_update', data=>{
      this.verifyLastSale();
    });
    this.events.subscribe('push:order_complete', data=>{
      this.verifySaleFeedback();
    });

  }

  loader=this.load.create({
    content: this.device.getRandonLoading()
  })

  ionViewDidLoad() {
    if(this.params.get('justFinished')){
      this.openStatus();
    }else{
      this.verifyLastSale();
      this.verifySaleFeedback();
    }
    this.getZone();
    this.device.camPage('home');
    this.device.device.platform

    if(this.device.device.platform==='Android' || this.device.device.platform==='android'){
      this.device.startPush();
    }else{
      this.storage.get('hasOpenNotification')
      .then((hasOpen) => {
        if(hasOpen){
          this.device.startPush();
        }else{
          let notificationModal = this.modalCtrl.create(NotificationModalPage);
          notificationModal.present().then(r=>{
            this.storage.set('hasOpenNotification','true');
          });
        }
      })
    }
  }

  ngAfterViewInit() {
    this.slides.loop=false;
    this.slides.slidesPerView =2;
    this.slides.initialSlide = 0;
    this.slides.centeredSlides=true;
  }

  verifyLastSale(){
    this.order.getLastOpenSale()
    .then(ls=>{
      if(ls){
        this.sale=ls; //verificar aqui se ainda tem alguma venda em aberto se nao tem que remover a barra...
      }else{
        this.sale=null;
      }
    })
    .catch(e=>{});
  }
  i=0;
  verifySaleFeedback(){
    this.i++;
    this.order.getSaleForFeedback()
    .then(lf=>{
      if(lf){
        let feedbackModal = this.modalCtrl.create(FeedbackModalPage, {sale: lf});
        feedbackModal.onDidDismiss(date=>{
          this.device.camPage('home');
        })
        feedbackModal.present();
      }
    })
    .catch(e=>{});
  }

  //zona valida
  //produtos
  getZone(){
    this.loader.present();
    this.order.getZone()
    .then(z=>{
      this.device.oneSignalTag('zone',z['zone']);
      var closedtime = JSON.parse(z["schedule"]);
      this.hours =closedtime;
      var d=new Date();
      if(d.getHours() > closedtime[d.getDay()].start && d.getHours() < closedtime[d.getDay()].end){
        this.closed = true;
      }
      this.err=null;

      this.products=z['products'];

      this.loadedcompleted=true;
      this.zone.run(()=>{});
      // this.slides.slideTo(1);
      this.loader.dismiss();

    })
    .catch(e=>{
      this.loadedcompleted=true;
      this.err=e.message;
      this.zone.run(()=>{});
      this.loader.dismiss();            //estar sem conexão com a internet
    });
  }
  selectBeer(beer){
    let modal = this.modalCtrl.create(HomeConfirmModalPage,{'beer':beer});
    modal.present()
    modal.onDidDismiss(data => {
      this.device.camPage('home');
    });
  }
  scheduleisopen=false;
  openSchedule(){
    if(!this.scheduleisopen){
      let modal = this.modalCtrl.create(ScheduleModalPage,{hours:this.hours, closed:this.closed});
      modal.present().then(r=>{
        this.scheduleisopen=true;
      })
      modal.onDidDismiss(data => {
        this.device.camPage('home');
      });
    }
  }

  statusIsOpen=false;
  openStatus(){
    if(!this.statusIsOpen){
      let modal = this.modalCtrl.create(StatusModalPage,{hours:this.hours, closed:this.closed});
      modal.present().then(r=>{
        this.statusIsOpen=true;
      });
      modal.onDidDismiss(data => {
        this.statusIsOpen=false;
        if(data==='empty'){
          this.sale=null;
        }
        this.device.camPage('home');
        this.events.publish('push:order_update', data);
      });
    }
  }
  openVoucher(){
    let voucherModal = this.modalCtrl.create(VoucherModalPage);
    voucherModal.present().then(r=>{
      this.statusIsOpen=true;
    });
  }
  onTaped(){
    this.taped=true;
  }
  tryAgain(){
    this.navCtrl.setRoot(HomePage);
  }
}
