import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';

import { ConstantsProvider } from '../../providers/constants/constants';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  code='AWE123KTM';
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private c: ConstantsProvider,
    private socialSharing: SocialSharing
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }


  shareVia(){
    this.socialSharing.share("use meu cupom de desconto", "cupom desconto",null, "cvja.me/ganhe10")
  }
  shareViaWhatsApp(){
    this.socialSharing.shareViaSMS("use meu cupom de desconto"+this.code+"cvja.me/ganhe10","")
  }

}
