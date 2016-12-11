import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the ModalRegister page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-modal-register',
  templateUrl: 'modal-register.html'
})
export class ModalRegisterPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello ModalRegisterPage Page');
  }

}
