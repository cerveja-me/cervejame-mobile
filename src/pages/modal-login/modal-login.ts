import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

//providers
import { UserProvider } from '../../providers/user/user';
@Component({
  selector: 'page-modal-login',
  templateUrl: 'modal-login.html',
})
export class ModalLoginPage {
  u:any;
  constructor(
    private user:UserProvider
  ) {
    this.u={
      login: 'jeferson',
      password:'123456'
    }
  }

  ionViewDidLoad() {
    this.user.profileLogin(this.u);
    console.log('ionViewDidLoad ModalLoginPage');
  }

}
