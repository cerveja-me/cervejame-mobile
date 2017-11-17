import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

//providers
import { OrderProvider } from '../../providers/order/order';

@Component({
  selector: 'page-modal-schedule',
  templateUrl: 'modal-schedule.html',
})
export class ModalSchedulePage {
  hours;
  closed;
  day = new Date().getDay();

  /*
  trazer da api já em formato correto todas as horas de atendimento do aplicatico
  com data para a semana
  */
  constructor(
  ) {

  }

  ionViewDidLoad() {

  }

}
