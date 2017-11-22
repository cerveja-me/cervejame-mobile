import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

//providers
import { OrderProvider } from '../../providers/order/order';

@Component({
  selector: 'page-modal-schedule',
  templateUrl: 'modal-schedule.html',
})
export class ModalSchedulePage {
  hours=[];
  closed;
  day = new Date();
  time= this.day.getTime();
  weekday=this.day.getDay();
  constructor(
    private navParams:NavParams
  ) {
  }


  ionViewDidLoad() {
    this.hours=   this.navParams.get('hours');
  }

}
