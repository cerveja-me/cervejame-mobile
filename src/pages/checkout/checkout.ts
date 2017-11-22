import { Component } from '@angular/core';
import { NavController,ModalController,ViewController } from 'ionic-angular';

//providers
import { OrderProvider } from '../../providers/order/order';

//relatedPages
import { ModalVoucherPage } from '../modal-voucher/modal-voucher';
import { HomePage } from '../home/home';
import { StatusPage } from '../status/status';

@Component({
  selector: 'page-checkout',
  templateUrl: 'checkout.html',
})
export class CheckoutPage {
  or;
  closing;
  payment;
  address='';
  constructor(
    private navCtrl:NavController,
    private modalCtrl:ModalController,
    private viewCtrl: ViewController,
    private order:OrderProvider
  ) {
    this.or=this.order.getOrder();
    this.address = this.or['location']['street']+", "+this.or['location']['number'];
    if(this.or['location']['complement']){
      this.address+=', comp.: '+this.or['location']['complement']
    }
  }

  ionViewDidLoad() {
  }

  close(){
    this.closing=true;
    setTimeout(() => {
      this.viewCtrl.dismiss();
    },300);
  }

  openVoucherModal(){
    let modal = this.modalCtrl.create(ModalVoucherPage);
    modal.present();
  }

  finishOrder(){
    this.order.completeOrder()
    .then(res=>{
      this.navCtrl.setRoot(StatusPage);
    })
    .catch( e =>{
      console.log('er-> ',e);
    })
  }

}
