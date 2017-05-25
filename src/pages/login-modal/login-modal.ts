import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController,ViewController } from 'ionic-angular';

import { DeviceProvider } from '../../providers/device/device';


import { RegisterModalPage } from '../register-modal/register-modal';


@Component({
    selector: 'page-login-modal',
    templateUrl: 'login-modal.html',
})
export class LoginModalPage {

    login = {
        email:'',
        password:''
    }

    constructor(
        public navCtrl: NavController,
        public modalCtrl:ModalController,
        public viewCtrl: ViewController,
        public navParams: NavParams,
        public device:DeviceProvider
        ) {
    }

    ionViewDidLoad() {
        this.device.camPage('login');
        console.log('ionViewDidLoad LoginModalPage');
    }

    openModalRegister(){
        let modal = this.modalCtrl.create(RegisterModalPage);
        modal.present();
        modal.onDidDismiss(data => {

            if(data==='success'){
                this.dismiss('success');

            }else{
                this.device.camPage('login');
            }
        });
    }
    facebookRegister(){}
    doLoginForm(){}

    dismiss(re){
        this.viewCtrl.dismiss(re);
    }
}
