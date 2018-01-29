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
    this.socialSharing.share("use meu cupom de desconto", "cupom desconto",null, "cvja.me/ganhe10")
  }
  
  shareViaWhatsApp(){
    
  }

  shareViaSMS(){
    this.socialSharing.shareViaSMS("use meu cupom de desconto"+this.code+"cvja.me/ganhe10","")
  }

}
