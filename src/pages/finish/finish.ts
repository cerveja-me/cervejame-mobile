import { Component } from '@angular/core';
import { NavController,Events } from 'ionic-angular';

import { Page1 } from '../page1/page1';
import { User } from '../../providers/user';

declare var UXCam:any;



/*
  Generated class for the Finish page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
  */
  @Component({
    selector: 'page-finish',
    templateUrl: 'finish.html'
  })
  export class FinishPage {
    sale:any;
    constructor(public navCtrl: NavController,
      public _user:User,
      public events: Events
      ) {
      UXCam.tagScreenName("finish");
      this.events.subscribe('push:order_update', data=>{
        this.verifyLastSale();
      })

      //Appsee.startScreen('finish');

      // an.trackView('Finish','none');
    }

    ionViewDidLoad() {
      this.verifyLastSale();
    }

    verifyLastSale(){
      this._user.getLastSale()
      .then(sale=>{
        console.log('asda');
        if(sale){
          this.sale=sale;
        }
      })
      .catch(e=>{

      })
    }

    gotopage1(){
      this.navCtrl.push(Page1);
    }

  }
