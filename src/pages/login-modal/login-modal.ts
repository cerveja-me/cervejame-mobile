import { Component } from '@angular/core';
import { NavController, NavParams,ModalController,ViewController,LoadingController,AlertController } from 'ionic-angular';

import { DeviceProvider } from '../../providers/device/device';
import { UserProvider } from '../../providers/user/user';

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

    loader;

    constructor(
        public navCtrl: NavController,
        public modalCtrl:ModalController,
        public viewCtrl: ViewController,
        public navParams: NavParams,
        public alert:AlertController,
        public load:LoadingController,
        public device:DeviceProvider,
        public user:UserProvider
        ) {
    }

    ionViewDidLoad() {
        this.device.camPage('login');
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

    doFacebookRegister(){
        this.loader=this.load.create({content: this.device.getRandonLoading()});
        this.loader.present();
        this.user.facebookRegister()
        .then(u=>{
            this.loader.dismiss();
            this.dismiss('success');
        })
        .catch(e=>{
            this.dismiss('success');
        });
    }

    doLoginForm(){
        this.loader=this.load.create({
            content: this.device.getRandonLoading()
        });
        this.loader.present();
        this.user.loginUser(this.login)
        .then(u =>{
            this.loader.dismiss();
            if(u['err'] == null ){
                this.user.setLoggedUser(u);
                this.dismiss('success');
            }else{
                let alert = this.alert.create({
                    title: 'Dados Invalidos',
                    message: 'Parece que você errou sua senha, cuidado quando for utilizar o aplicativo enquanto estiver alcoolizado.',
                    buttons: ['Ok']
                });
                alert.present();
            }
        })
        .catch(e=>{
            this.loader.dismiss();
            let alert = this.alert.create({
                title: 'Erro',
                message: 'Opa! Tivemos um erro, por favor tente novamente, se o erro persistir entre contato <a href="http://cerveja.me">Cerveja.me</a>.',
                buttons: ['Ok']
            });
            alert.present();

        })
    }

    dismiss(re){
        this.viewCtrl.dismiss(re);
    }
}
