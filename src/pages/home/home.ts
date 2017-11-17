import { Component,ViewChild,NgZone } from '@angular/core';
import { NavController,ModalController,Slides } from 'ionic-angular';
import { Storage } from '@ionic/storage';
//providers
import { DeviceProvider } from '../../providers/device/device'
import { LocationProvider } from '../../providers/location/location';
import { OrderProvider } from '../../providers/order/order';

//relatedPages
import { MapPage } from '../map/map';
import { ModalVoucherPage } from '../modal-voucher/modal-voucher';
import { ModalSchedulePage } from '../modal-schedule/modal-schedule';
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
  discount=0;
  updatingAmount;
  constructor(
    private modalCtrl: ModalController,
    public navCtrl: NavController,
    private zone:NgZone,
    private storage:Storage,
    private device:DeviceProvider,
    private order: OrderProvider,

  ) {

  }

  ionViewDidLoad() {
    this.order.getZone()
    .then( (l) => {
      this.location=l
      this.products=l['zone']['products'];
      this.slideChanged();
      this.loadedcompleted=true;
    })
    .catch( e =>{
      console.log('erro ->',e);
      /*
      * tratar os erros:
      * - localização Bloqueada
      * - liberada mas deu setTimeout
      * - liberada mas não fora de area
      * - dentro de area mas sem produtos
      */

    })
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
    this.selectedBeer.unitValue = this.selectedBeer.unitvalue*(1-this.selectedBeer.discount);

    this.zone.run(()=>{});
  }
  onTaped(event){
    this.taped=true;
    this.changingSlide=true;
  }

  selectProduct(p){
    this.order.setProduct(p,this.amount);
    this.navCtrl.push(MapPage);
  }

  openModalVoucher(){
    let voucherModal = this.modalCtrl.create(ModalVoucherPage);
    voucherModal.present();
  }

  openSchedule(){
    let scheduleModal = this.modalCtrl.create(ModalSchedulePage);
    scheduleModal.present();
  }

}
