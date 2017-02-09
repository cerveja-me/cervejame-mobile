import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Page1 } from '../page1/page1';
import { Analytics } from '../../providers/analytics';

/*
  Generated class for the Feedback page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
  */
  @Component({
    selector: 'page-feedback',
    templateUrl: 'feedback.html'
  })
  export class FeedbackPage {

    constructor(public navCtrl: NavController,
      private an:Analytics) {
      an.trackView('FeedbackPage','none');

    }
    ionViewDidLoad() {
      console.log('Hello FeedbackPage Page');
    }
    gotopage1(){
      this.navCtrl.push(Page1);
    }
  }
