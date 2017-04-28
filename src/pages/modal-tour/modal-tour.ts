import { Component } from '@angular/core';
import { Analytics } from '../../providers/analytics';
import { App} from 'ionic-angular';

import {NavController, Platform, NavParams, ViewController } from 'ionic-angular';

//declare var Appsee:any;

@Component({
  selector: 'page-modal-tour',
  templateUrl: 'modal-tour.html'
})

export class ModalTourPage {

  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController,
    public navCtrl: NavController,
    private an : Analytics,
    private app : App
    ) {
    this.app.setScrollDisabled(true);
    //Appsee.startScreen('modal_tour');
    // an.trackView('modal_tour','none');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
