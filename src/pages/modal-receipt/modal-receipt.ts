
import { Component,NgZone } from '@angular/core';
import {LoginPage} from '../login/login';
import { MapPage } from '../map/map';
import { FinishPage } from '../finish/finish';
import { Sale } from '../../providers/sale';
import { User } from '../../providers/user';

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
    private zone:NgZone,
    private _user:User
    ) {
    this.beer=this.params.get('beer');
    this.beer.amount=1;
    console.log('beer->',this.beer);
    this.zone.run(()=>{});

  }


  dismiss() {
    this.viewCtrl.dismiss();
  }

  finishRequest(){

    this._sale.setProduct(this.beer);
    console.log('ahahhaha->');
    this._user.isUserLogged()
    .then((res)=>{
      console.log('is user loged? ',res);
      if(res){
        console.log('caiu no true');
        this.navCtrl.push(MapPage);
      }else{
        console.log('caiu no false');
        this.navCtrl.push(LoginPage);
      }

    })

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
