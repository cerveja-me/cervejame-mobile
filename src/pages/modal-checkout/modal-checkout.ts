import { Component } from '@angular/core';
import { NavController,ModalController,ViewController } from 'ionic-angular';

//providers
import { OrderProvider } from '../../providers/order/order';

//relatedPages
import { ModalVoucherPage } from '../modal-voucher/modal-voucher';
@Component({
  selector: 'page-modal-checkout',
  templateUrl: 'modal-checkout.html',
})
export class ModalCheckoutPage {
  or;

  constructor(
    private navCtrl: NavController,
    private modalCtrl:ModalController,
    private viewCtrl: ViewController,
    private order:OrderProvider
  ) {
    this.or=this.order.getOrder();
    console.log(this.or);
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
}
