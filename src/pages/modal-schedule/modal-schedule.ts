import { Component } from '@angular/core';
import { NavController,NavParams,ViewController } from 'ionic-angular';

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
    day = new Date().getDay();

    constructor(
      public navCtrl: NavController,
      public params: NavParams,
      public viewCtrl:ViewController
      ) {
      UXCam.tagScreenName("modal-schedule");

    }

    ionViewDidLoad() {
      this.hours= this.params.get("hours");
    }
    dismiss() {
      this.viewCtrl.dismiss();
    }

  }
