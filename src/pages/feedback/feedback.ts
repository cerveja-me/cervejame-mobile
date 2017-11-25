import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { OrderProvider } from '../../providers/order/order';

@Component({
  selector: 'page-feedback',
  templateUrl: 'feedback.html',
})
export class FeedbackPage {
  rate;
  comment;
  sale;
  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private order:OrderProvider) {
      this.sale=this.navParams.get('sale');
      console.log('sale ',this.sale);
    }

    sendFeedback(){
      this.order.rateOrder({
        id_sale:this.sale.id_sale,
        comment:this.comment,
        rate:this.rate
      })
      .then(r=>{
        this.navCtrl.pop();
      })
    }
  }
