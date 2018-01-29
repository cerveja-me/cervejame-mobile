import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';

import { ConstantsProvider } from '../../providers/constants/constants';
import { UserProvider } from '../../providers/user/user';
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  code='';
  user_data={};
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private c: ConstantsProvider,
    private socialSharing: SocialSharing,
    private user:UserProvider
  ) {
    this.user.getCostumerData(true)
    .then( ud =>{
      this.user_data=ud;
      this.code=this.user_data['code'].toUpperCase();
    })
  }

  ionViewDidLoad() {
    this.user.getCostumerData(false)
    .then( ud =>{
      this.user_data=ud;
      this.code=this.user_data['code'].toUpperCase();
    })
  }


  shareVia(){
    this.socialSharing.share(`use meu cupom de desconto: ${this.code} e ganhe R$ 10 de desconto nas suas compras pelo app: https://kw46h.app.goo.gl/cerve`);
  }

  shareViaWhatsApp(){
    this.socialSharing.shareViaWhatsApp(`use meu cupom de desconto: ${this.code} e ganhe R$ 10 de desconto nas suas compras pelo app: https://kw46h.app.goo.gl/cerve`);
  }

  shareViaFacebook(){
    this.socialSharing.shareViaFacebook(`use meu cupom de desconto: ${this.code} e ganhe R$ 10 de desconto nas suas compras pelo app: https://kw46h.app.goo.gl/cerve`,'https://kw46h.app.goo.gl/cerve');
  }

}
