import { Component, NgZone } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

//providers
import { OrderProvider } from '../../providers/order/order';

//relatedPages
import { HomePage } from '../home/home';

@Component({
  selector: 'page-status',
  templateUrl: 'status.html',
})
export class StatusPage {
  sales;
  sale:any;
  constructor(
    private zone:NgZone,
    private navCtrl: NavController,
    private navParams: NavParams,
    private order:OrderProvider,
  ) {
  }

  ionViewDidLoad() {
    this.order.getOrders()
    .then(s=>{
      this.sales=s;
      this.sale=s[0];
      this.zone.run(()=>{});
    })
    .catch( e =>{
      console.log('ee->',e);
    })
  }

  backHome(){
    this.navCtrl.setRoot(HomePage);
  }



}
