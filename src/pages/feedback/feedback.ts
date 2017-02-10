import { Component } from '@angular/core';
import { NavController,NavParams,ViewController } from 'ionic-angular';
import { Page1 } from '../page1/page1';
import { Sale } from '../../providers/sale';
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

    rate;
    comment;
    sale;
    constructor(public navCtrl: NavController,
      public params: NavParams,
      private an:Analytics,
      public viewCtrl: ViewController,

      private sa:Sale) {
      an.trackView('FeedbackPage','none');
      this.sale=this.params.get("sale");

    }
    ionViewDidLoad() {
      this.sale=this.params.get("sale");
      console.log('Hello FeedbackPage Page');
    }
    dismiss() {
      this.viewCtrl.dismiss();
    }

    finishFeedback(){
      this.sa.sendFeedback({id:this.sale.id,rate:this.rate,comment:this.comment})
      .then(res=>{
        console.log('result->',res);
        this.dismiss();
      })
    }
  }
