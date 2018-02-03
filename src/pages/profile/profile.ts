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
      })
  }


  shareVia() {
    this.socialSharing.share(`use meu cupom de desconto: ${this.code} e ganhe R$ 10 de desconto nas sua primeira compras pelo app: http://bit.ly/appamigo`);
  }

  shareViaWhatsApp() {
    this.socialSharing.shareViaWhatsApp(`use meu cupom de desconto: ${this.code} e ganhe R$ 10 de desconto nas sua primeira compras pelo app: http://bit.ly/appamigo`);
  }

  shareViaFacebook() {
    this.socialSharing.shareViaFacebook(`use meu cupom de desconto: ${this.code} e ganhe R$ 10 de desconto nas sua primeira compras pelo app: http://bit.ly/appamigo`, 'http://bit.ly/appamigo');
  }
  openTerms() {
    let modal = this.modalCtrl.create(ProfileTermsPage);
    modal.present().then(r => {
      this.device.camPage("profile");
    })
  }
  openReferrals() {
    let modal = this.modalCtrl.create(ProfileReferralsPage,{profile:this.user_data});
    modal.present().then(r => {
      this.device.camPage("profile");
    })
  }

}
