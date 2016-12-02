
import { Component,NgZone } from '@angular/core';
import {LoginPage} from '../login/login';
import { MapPage } from '../map/map';
import { FinishPage } from '../finish/finish';
import { Sale } from '../../providers/sale';


import {NavController, Platform, NavParams, ViewController } from 'ionic-angular';

@Component({
  templateUrl: 'modal-receipt.html'
})
export class ModalContentPage {
  character;
  beer;

  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController,
    public navCtrl: NavController,
    private _sale:Sale,
    private zone:NgZone
    ) {
    this.beer=this.params.get('beer');
    this.beer.amount=1;
    console.log('beer->',this.beer);
    this.zone.run(()=>{});

  }


  dismiss() {
    this.viewCtrl.dismiss();
  }
  gotomap(){
    this.navCtrl.push(LoginPage);
    console.log('aqui vai pro mapa');
  }
  finishRequest(){
    this.navCtrl.push(FinishPage);
  }

  increaseAmount(){
    this.beer.amount++;
    this.zone.run(()=>{});
    // this._sale.setProduct(this.beer);
  }
  decreaseAmount(){
    if(this.beer.amount>1){
      this.beer.amount--;
      this.zone.run(()=>{});
      // this._sale.setProduct(this.beer);
    }
  }
}
