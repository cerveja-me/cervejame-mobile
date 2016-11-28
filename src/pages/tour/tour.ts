import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Page1 } from '../page1/page1';


/*
  Generated class for the Tour page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
  */
  @Component({
    selector: 'page-tour',
    templateUrl: 'tour.html'
  })
  export class TourPage {

    constructor(public navCtrl: NavController) {}

    ionViewDidLoad() {
      console.log('Hello TourPage Page');
    }
    startBuy(){
      this.navCtrl.push(Page1);
    }

  }
