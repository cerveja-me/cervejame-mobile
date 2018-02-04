import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { DeviceProvider } from '../../providers/device/device'; 

@Component({
  selector: 'page-profile-referrals',
  templateUrl: 'profile-referrals.html',
})
export class ProfileReferralsPage {

  user_data;
  constructor(public navCtrl: NavController, public navParams: NavParams, private device: DeviceProvider) {
  }

  ionViewDidLoad() {
    this.user_data=this.navParams.get('profile'); 
    this.device.camPage('friend_referral_referrals'); 
   }
  
}
