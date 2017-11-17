import { Component } from '@angular/core';
import { ModalController,ViewController } from 'ionic-angular';

//providers
import { OrderProvider } from '../../providers/order/order';

//relatedPages
import { ModalVoucherPage } from '../modal-voucher/modal-voucher';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-checkout',
  templateUrl: 'checkout.html',
})
export class CheckoutPage {
  or;
  closing;
  payment;
  constructor(
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
  finishOrder(){
    this.order.completeOrder();
    this.navCtrl.setRoot(HomePage);
  }
}
