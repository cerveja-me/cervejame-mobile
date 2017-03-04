import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

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

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello ModalSchedulePage Page');
  }

}
