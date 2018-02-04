import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { DeviceProvider } from '../../providers/device/device'; 
@Component({
  selector: 'page-profile-terms',
  templateUrl: 'profile-terms.html',
})
export class ProfileTermsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private device: DeviceProvider) {
  }

  ionViewDidLoad() {
    this.device.camPage('friend_referral_terms');  
  }

}
