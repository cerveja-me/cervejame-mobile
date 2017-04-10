
import { Component,NgZone } from '@angular/core';
import {LoginPage} from '../login/login';
import { MapPage } from '../map/map';
import { FinishPage } from '../finish/finish';
import { Sale } from '../../providers/sale';
import { User } from '../../providers/user';
import { Analytics } from '../../providers/analytics';

import {NavController, Platform, NavParams, ViewController } from 'ionic-angular';

declare var Appsee:any;
@Component({
  templateUrl: 'modal-receipt.html'
})
export class ModalContentPage {
  character;
  beer;
  timeStart;
  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController,
    public navCtrl: NavController,
    private _sale:Sale,
    private zone:NgZone,
    private _user:User,
    private an:Analytics) {

    Appsee.startScreen('modal_receip');
    // an.trackView('modal_receip','none');

    this.beer=this.params.get('beer');
    this.beer.amount=1;
    this.zone.run(()=>{});

    this.timeStart =new Date().getMilliseconds();
    // let time =new Date().getMilliseconds()-this.startTime;
    // this.an.time('TimeToChooseBeer',time,'','');
    // this.an.button('selected_beer',beer.zone,beer.product.name,beer.price);
  }


  dismiss() {
    this.an.button('select_canceled',this.beer.zone,this.beer.product.name,this.beer.price);
    this.viewCtrl.dismiss();
  }

  finishRequest(){
    let time = new Date().getMilliseconds()-this.timeStart;
    this.an.time('TimeToChooseQuantity',time,'','');
    this._sale.setProduct(this.beer);

    this._user.isUserLogged()
    .then((res)=>{
      if(res){
        this.navCtrl.push(MapPage);
      }else{
        this.navCtrl.push(LoginPage);
      }
    })
  }

  increaseAmount(){
    this.an.button('increase_quantity_modal',this.beer.zone,this.beer.product.name,this.beer.price);
    this.beer.amount++;
    this.zone.run(()=>{});
  }
  decreaseAmount(){
    this.an.button('decrease_quantity_modal',this.beer.zone,this.beer.product.name,this.beer.price);
    if(this.beer.amount>1){
      this.beer.amount--;
      this.zone.run(()=>{});
    }
  }
}
