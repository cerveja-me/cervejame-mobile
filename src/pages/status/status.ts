import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

//relatedPages
import { HomePage } from '../home/home';

@Component({
  selector: 'page-status',
  templateUrl: 'status.html',
})
export class StatusPage {

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StatusPage');
  }

  backHome(){
    this.navCtrl.setRoot(HomePage);
  }



}
