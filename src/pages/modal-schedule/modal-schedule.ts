import { Component } from '@angular/core';
import { NavController,NavParams,ViewController,Platform } from 'ionic-angular';

declare var UXCam:any;

/*
  Generated class for the ModalSchedule page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
  */
  @Component({
    selector: 'page-modal-schedule',
    templateUrl: 'modal-schedule.html'
  })
  export class ModalSchedulePage {
    hours;
    closed;
    day = new Date().getDay();

    constructor(
      public navCtrl: NavController,
      public params: NavParams,
      public viewCtrl:ViewController,
      public platform:Platform) {

      if(this.platform.is('cordova')){
        UXCam.tagScreenName("modal-schedule");
      }

    }

    ionViewDidLoad() {
      this.hours= this.params.get("hours");
      this.closed= this.params.get("closed");
    }
    dismiss() {
      this.viewCtrl.dismiss();
    }

  }
