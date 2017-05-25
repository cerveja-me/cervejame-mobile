import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,ModalController } from 'ionic-angular';

import { OrderProvider } from '../../providers/order/order';
import { GeolocationProvider } from '../../providers/geolocation/geolocation';

import { LoginModalPage } from '../login-modal/login-modal';
import { RegisterModalPage } from '../register-modal/register-modal';
import { DeviceProvider } from '../../providers/device/device';
import { UserProvider } from '../../providers/user/user';


@Component({
    selector: 'page-checkout-modal',
    templateUrl: 'checkout-modal.html',
})
export class CheckoutModalPage {
    character;
    user;
    request;
    product;
    address;
    fullAddress;
    payment='card';
    addressComplement='';
    readAddress='';
    constructor(
        public navCtrl: NavController,
        public params: NavParams,
        public viewCtrl: ViewController,
        public modalCtrl:ModalController,

        public order:OrderProvider,
        public device:DeviceProvider,
        public geoloc:GeolocationProvider,
        public userp:UserProvider
        )
    {

    }

    ionViewDidLoad() {
        this.device.camPage('checkout');
        this.product=this.order.getProduct();
        this.fullAddress=this.params.get("address");
        this.addressComplement=this.params.get("complement");
        this.address=this.geoloc.formatAddress(this.fullAddress) +(this.addressComplement?", "+this.addressComplement:'');

    }

    dismiss() {
        this.viewCtrl.dismiss();
    }

    finishOrder(){
        this.userp.isUserLogged()
        .then(userLogged=>{
            if(userLogged){
                console.log('finalizar');
            }else{
                this.login();
            }
        })
    }
    login(){
        let modal = this.modalCtrl.create(LoginModalPage);
        modal.present();
        modal.onDidDismiss(data => {
            if(data==='success'){
                this.finishOrder();
            }else{
                this.device.camPage('login');
            }
        });
    }



    //ver se tem usuario logado

}
