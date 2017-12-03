import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PaymentProvider } from '../../providers/payment/payment';

@Component({
  selector: 'page-card',
  templateUrl: 'card.html',
})
export class CardPage {
  URL_BASE='https://api.mercadopago.com';
  CUSTOMERS='/v1/customers/';
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private payment:PaymentProvider
  ) {
  }

  ionViewDidLoad() {
    // this.payment.getCardToken()
  }

  createCustomer(){

  }


}
