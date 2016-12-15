import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Page1 } from '../page1/page1';

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

    constructor(public navCtrl: NavController) {}

    ionViewDidLoad() {

    }
    gotopage1(){
      this.navCtrl.push(Page1);
    }

  }
