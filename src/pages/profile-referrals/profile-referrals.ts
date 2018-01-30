import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-profile-referrals',
  templateUrl: 'profile-referrals.html',
})
export class ProfileReferralsPage {

  user_data;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.user_data=this.navParams.get('profile'); 
  }
  
}
