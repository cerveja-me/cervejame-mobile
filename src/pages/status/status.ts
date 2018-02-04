import { Component, NgZone } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';
import 'rxjs/add/observable/interval';
import { Observable } from 'rxjs/Observable';

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
  actions:any={
    accepted:null,
    onWay:null,
    finishedAt:null
  }
  sub;
  constructor(
    private zone:NgZone,
    private navCtrl: NavController,
    private navParams: NavParams,
    private order:OrderProvider,
    private events:Events
  ) {
    this.events.subscribe('push:order_update', data=>{
      this.verifyOpenSale();
    });
    this.sub = Observable.interval(10000)
    .subscribe((val) => { 
      this.verifyOpenSale();  
     });
  }

  ionViewDidLoad() {
    this.order.device.camPage("status");
    this.verifyOpenSale();
  }
  verifyOpenSale(){
    this.order.getOrders()
    .then(s=>{
      this.sales=s;
      this.sale=s[0];
      if(this.sale.complement){
        this.sale.complement=' compl.:'+this.sale.complement;
      }
      if(this.sale.actions){
        for(let i=0; i<this.sale.actions.length; i++){
          switch(this.sale.actions[i].action){
            case 1:
              this.actions.accepted=this.sale.actions[i];
              this.zone.run(()=>{});
              break;
            case 2:
              this.actions.onWay=this.sale.actions[i];
              this.zone.run(()=>{});
              break;
            case 4:
              this.actions.finishedAt=this.sale.actions[i];
              this.zone.run(()=>{});
              break;
          }

        }

      }
    })
    .catch( e =>{
      console.log('ee->',e);
    })
  }

  backHome(){
    this.navCtrl.setRoot(HomePage);
  }

}
