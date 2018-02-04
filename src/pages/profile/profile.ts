import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';

import { ConstantsProvider } from '../../providers/constants/constants';
import { UserProvider } from '../../providers/user/user';
import { DeviceProvider } from "../../providers/device/device";
import { ProfileReferralsPage } from '../profile-referrals/profile-referrals';
import { ProfileTermsPage } from '../profile-terms/profile-terms';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  code = '';
  user_data = {};
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private c: ConstantsProvider,
    private socialSharing: SocialSharing,
    private user: UserProvider,
    private modalCtrl: ModalController,
    private device: DeviceProvider
  ) {
    this.user.getCostumerData(true)
      .then(ud => {
        this.user_data = ud;
        this.code = this.user_data['code'].toUpperCase();
      })
  }

  ionViewDidLoad() {
    this.user.getCostumerData(false)
      .then(ud => {
        this.user_data = ud;
        this.code = this.user_data['code'].toUpperCase();
        this.device.camPage('friend_referral_home');
      })
  }


  shareVia() {
    this.socialSharing.share(`use meu cupom de desconto: ${this.code} e ganhe R$ 10 de desconto nas sua primeira compras pelo app: http://cvja.me/2nAR2vE`);
    this.device.registerEvent('friend_referral_share',{code:this.code});
  }

  shareViaWhatsApp() {
    this.socialSharing.shareViaWhatsApp(`use meu cupom de desconto: ${this.code} e ganhe R$ 10 de desconto nas sua primeira compras pelo app: http://cvja.me/2nAR2vE`);
    this.device.registerEvent('friend_referral_share_whats_app',{code:this.code});
  }

  shareViaFacebook() {
    this.socialSharing.shareViaFacebook(`use meu cupom de desconto: ${this.code} e ganhe R$ 10 de desconto nas sua primeira compras pelo app: http://cvja.me/2nAR2vE`, 'http://cvja.me/2nAR2vE');
    this.device.registerEvent('friend_referral_share_facebook',{code:this.code});
  }

  openTerms() {
    let modal = this.modalCtrl.create(ProfileTermsPage);
    modal.present().then(r => {
      this.device.camPage("friend_referral_home");
    })
    this.device.registerEvent('friend_referral_open_terms',{code:this.code});

  }

  openReferrals() {
    let modal = this.modalCtrl.create(ProfileReferralsPage,{profile:this.user_data});
    modal.present().then(r => {
      this.device.camPage("friend_referral_home");
    })
    this.device.registerEvent('friend_referral_open_referrals',{code:this.code});
  }

}
