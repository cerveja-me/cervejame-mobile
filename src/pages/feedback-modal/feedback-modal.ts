import { Component } from '@angular/core';
import { NavController, NavParams,LoadingController,ViewController } from 'ionic-angular';

import { OrderProvider } from '../../providers/order/order';
import { DeviceProvider } from '../../providers/device/device';

@Component({
  selector: 'page-feedback-modal',
  templateUrl: 'feedback-modal.html',
})
export class FeedbackModalPage {
  rate:number;
  comment:string;
  sale:any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public load:LoadingController,
    public viewCtrl:ViewController,
    public device:DeviceProvider,
    public order:OrderProvider) {
  }


  loader=this.load.create({
    content: this.device.getRandonLoading()
  })

  ionViewDidLoad() {
    this.device.camPage('feedback');
    this.sale=this.navParams.get('sale');
  }
  sendFeedback(){
    this.loader.present();
    this.order.sendFeedback({id:this.sale.id,rate:this.rate,comment:this.comment})
    .then(r=>{
      this.loader.dismiss();
      this.viewCtrl.dismiss();
    })
    .catch(e=>{
      this.loader.dismiss();
    })
  }

}
