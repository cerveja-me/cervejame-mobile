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
  actions:any={
    accepted:null,
    onWay:null,
    finishedAt:null
  }
  constructor(
    private zone:NgZone,
    private navCtrl: NavController,
    private navParams: NavParams,
    private order:OrderProvider,
  ) {
  }

  ionViewDidLoad() {
    this.order.device.camPage("status");
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
            case 3:
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
