import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

//providers
import { OrderProvider } from '../../providers/order/order';

@Component({
  selector: 'page-modal-schedule',
  templateUrl: 'modal-schedule.html',
})
export class ModalSchedulePage {
  hours=JSON.parse('[{"start":"2017-11-19T12:00:00.000","end":"2017-11-19T22:00:00.000","leg":"DOM"},{"start":"2017-11-20T12:00:00.000","end":"2017-11-20T22:00:00.000","leg":"SEG"},{"start":"2017-11-21T16:20:00.000","end":"2017-11-21T22:00:00.000","leg":"TER"},{"start":"2017-11-22T12:00:00.000","end":"2017-11-22T22:00:00.000","leg":"QUA"},{"start":"2017-11-23T12:00:00.000","end":"2017-11-23T22:00:00.000","leg":"QUI"},{"start":"2017-11-24T12:00:00.000","end":"2017-11-24T22:00:00.000","leg":"SEX"},{"start":"2017-11-25T12:00:00.000","end":"2017-11-25T22:00:00.000","leg":"SAB"}]');
  closed;
  day = new Date();
  time= this.day.getTime();
  weekday=this.day.getDay();
  constructor(
  ) {

  }
  convertTimes(){
    for(let i=0;i<7;i++){
      this.hours[i]['start']=new Date(this.hours[i]['start']);
      this.hours[i]['end']=new Date(this.hours[i]['end']);
      this.hours[i]['active']=this.time>this.hours[i]['start'].getTime() && this.time<this.hours[i]['end'].getTime()?true:false;
      this.hours[i]['day']=this.hours[i]['start'].getDay()==this.weekday;
      console.log('hour -> ',this.hours[i]);
    }
  }

  ionViewDidLoad() {
    this.convertTimes();
  }

}
