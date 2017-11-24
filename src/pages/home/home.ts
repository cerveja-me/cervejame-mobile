import { Component,ViewChild,NgZone } from '@angular/core';
import { NavController,ModalController,Slides,LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { LOCALE_ID } from '@angular/core';
//providers
import { DeviceProvider } from '../../providers/device/device'
import { LocationProvider } from '../../providers/location/location';
import { OrderProvider } from '../../providers/order/order';

//relatedPages
import { MapPage } from '../map/map';
import { ModalVoucherPage } from '../modal-voucher/modal-voucher';
import { ModalSchedulePage } from '../modal-schedule/modal-schedule';
import { ModalLoginPage } from '../modal-login/modal-login';
import { ModalNotificationPage } from '../modal-notification/modal-notification';
import { StatusPage } from '../status/status';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  products=[];
  location={};
  @ViewChild(Slides) slides: Slides;
  taped=false;
  changingSlide=false;
  amount=2;
  selectedBeer:any;
  ASSETS:string=this.order.c.REMOTE_ASSETS;
  showTip=false;
  current=0;
  loadedcompleted;
  err;
  discount=0;
  updatingAmount;
  loader;
  constructor(
    private modalCtrl: ModalController,
    public navCtrl: NavController,
    private zone:NgZone,
    private storage:Storage,
    private device:DeviceProvider,
    private order: OrderProvider,
    private load:LoadingController,
  ) {
    this.loader=this.load.create({
      content: this.device.getRandonLoading()
    })
    this.verifyPush();
  }


  ionViewDidLoad() {
    this.loader.present();
    this.order.getZone()
    .then( (l) => {
      this.location=l
      this.products=l['zone']['products'];
      this.slideChanged();
      this.loadedcompleted=true;
      // this.verifyTime();
      setTimeout(function(){
      console.log('buscar produtos ');
    },2000)
    this.loader.dismiss();
  })
  .catch( e =>{
    this.err=e;
    console.log('erro ->',e);
    /*
    * tratar os erros:
    * - localização Bloqueada
    * - liberada mas deu setTimeout
    * - liberada mas não fora de area
    * - dentro de area mas sem produtos
    */
    this.loader.dismiss();            //estar sem conexão com a internet
  })
}

openStatus(){
  this.navCtrl.push(StatusPage);
}

slideChanged() {
  let current =this.slides.getActiveIndex();
  if(this.products.length===current){
    this.slides.slidePrev();
  }else{
    this.current = current;
    this.changingSlide=false;

    this.amount=2;
    this.discount=0.05;
    this.zone.run(()=>{});

    this.selectedBeer={
      beer:this.products[current],
      discount:this.discount,
      amount:this.amount
    }
    this.updatePriceAndDiscount();
  }
}

increaseAmount(){
  this.updatingAmount=true;

  this.amount++;
  this.updatePriceAndDiscount();
  setTimeout(() => {
    this.updatingAmount=false;
  },100);
}

decreaseAmount(){
  this.updatingAmount=true;

  if(this.amount>1){
    this.amount--;
    this.updatePriceAndDiscount();
  }
  setTimeout(() => {
    this.updatingAmount=false;
  },100);
}

getTipStatus(){
  this.storage.get('hasSeenTip')
  .then((hasSeenTip) => {
    if (!hasSeenTip) {
      this.showTip=true;
      this.storage.set('hasSeenTip',true);
    }
  })
}

updatePriceAndDiscount(){
  if(this.selectedBeer.beer.progressive_discount){
    if(this.amount > 2){
      this.discount=0.1;
    }else{
      this.discount=(this.amount-1)*0.05;
    }

    this.selectedBeer.discount=this.discount;
    this.selectedBeer.amount=this.amount;
    let p = this.selectedBeer.beer.price * this.amount;
    let full = p;
    p=p-(p*this.discount);
    p=Math.round(p);
    this.selectedBeer.discount=1-(p/full);
    this.selectedBeer.finalDiscount=this.selectedBeer.discount*100;
    this.selectedBeer.price = p;
    this.selectedBeer.unitValue = p/(this.selectedBeer.beer.amount*this.amount) ;
  }else{
    let p = this.selectedBeer.beer.price * this.amount;
    this.selectedBeer.discount=0;
    this.selectedBeer.finalDiscount=0;
    this.selectedBeer.price = p;
    this.selectedBeer.unitValue = p/(this.selectedBeer.beer.amount*this.amount) ;

  }
  this.zone.run(()=>{});
}
onTaped(event){
  this.taped=true;
  this.changingSlide=true;
}

verifyPush(){
  this.storage.get('hasOpenNotification')
  .then((hasOpen) => {
    if(hasOpen){
      this.device.startPush();
    }else{
      let notificationModal = this.modalCtrl.create(ModalNotificationPage);
      notificationModal.present().then(r=>{
        this.storage.set('hasOpenNotification','true');
      });
    }
  })
}

selectProduct(p){
  this.order.setProduct(p,this.amount);
  this.navCtrl.push(MapPage);
}

openModalVoucher(){
  let voucherModal = this.modalCtrl.create(ModalVoucherPage);//,{}, {});
  voucherModal.present();
}

openSchedule(){
  let scheduleModal = this.modalCtrl.create(ModalSchedulePage,{hours:this['location']['zone']['schedule']})
  scheduleModal.present();
}

openLogin(){
  let loginModal = this.modalCtrl.create(ModalLoginPage)
  loginModal.present();
}
tryAgain(){
  this.navCtrl.setRoot(HomePage);
}

}
