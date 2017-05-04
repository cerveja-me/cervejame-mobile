
import { Component,NgZone } from '@angular/core';
import {LoginPage} from '../login/login';
import { MapPage } from '../map/map';
import { FinishPage } from '../finish/finish';
import { Sale } from '../../providers/sale';
import { User } from '../../providers/user';

import {NavController, Platform, NavParams, ViewController } from 'ionic-angular';

declare var UXCam:any;

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
    private _user:User) {

    if(platform.is('core'))
      UXCam.tagScreenName("modal-receipt");


    this.beer=this.params.get('beer');
    this.beer.amount=1;
    this.zone.run(()=>{});

    this.timeStart =new Date().getMilliseconds();
  }


  dismiss() {
    this.viewCtrl.dismiss();
  }

  finishRequest(){
    let time = new Date().getMilliseconds()-this.timeStart;
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
    this.beer.amount++;
    this.zone.run(()=>{});
  }
  decreaseAmount(){
    if(this.beer.amount>1){
      this.beer.amount--;
      this.zone.run(()=>{});
    }
  }
}
