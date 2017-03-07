import { Component } from '@angular/core';
import { NavController,NavParams,ViewController } from 'ionic-angular';

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
      ) {}

    ionViewDidLoad() {
      this.hours= this.params.get("hours");
    }
    dismiss() {
      this.viewCtrl.dismiss();
    }

  }
