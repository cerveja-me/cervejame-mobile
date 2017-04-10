import { Component } from '@angular/core';
import { NavController,NavParams,ViewController } from 'ionic-angular';
import { Analytics } from '../../providers/analytics';
import { Http,Response,Headers, RequestOptions } from '@angular/http';
import {ConstantService} from '../../providers/constant-service';
import { Page1 } from '../page1/page1';
import { Error } from '../../providers/error';
declare var Appsee:any;

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
      private cs :ConstantService,
      private _http:Http,
      private error:Error

      ) {
      Appsee.startScreen('feedback');
      // an.trackView('FeedbackPage','none');
      this.sale=this.params.get("sale");

    }
    ionViewDidLoad() {
      this.sale=this.params.get("sale");
      // console.log('Hello FeedbackPage Page');
    }
    dismiss() {

      this.viewCtrl.dismiss();
      this.navCtrl.push(Page1);
    }

    finishFeedback(){
      this.sendFeedback({id:this.sale.id,rate:this.rate,comment:this.comment})
      .then(res=>{
        console.log('result->',res);
        this.dismiss();
      })
      .catch(e=>{
        this.error.sendError('USER_OBTER_LOCALIZACAO',e);
      })
    }
    sendFeedback(data){

      return new Promise((resolve, reject) => {
        let body = JSON.stringify(data);
        let headers = new Headers({ 'Content-Type': 'application/json'});
        let options = new RequestOptions({ headers: headers, method: "post" });

        this._http.post(this.cs.API+this.cs.SALE+this.cs.SEND_FEEDBACK, body,options)
        .toPromise()
        .then((res)=>{
          // this._device.setDevice(res.json());
          resolve(res.json());
        })
        .catch(er=>{

        });
      })
    }
  }
