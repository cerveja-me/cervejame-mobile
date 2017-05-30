import { Component } from '@angular/core';
import { NavController, NavParams,ViewController,LoadingController,AlertController } from 'ionic-angular';

import { UserProvider } from '../../providers/user/user';
import { DeviceProvider } from '../../providers/device/device';


@Component({
    selector: 'page-register-modal',
    templateUrl: 'register-modal.html',
})
export class RegisterModalPage {
    register={
        name:'',
        email:'',
        password:'',
        phone:''
    }
    loader;
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public viewCtrl: ViewController,
        public load:LoadingController,
        public alert:AlertController,
        public user:UserProvider,
        public device:DeviceProvider
        )
    {
    }
    ionViewDidLoad() {
        this.device.camPage('register');
    }

    createUser(){
        this.loader=this.load.create({content: this.device.getRandonLoading()});
        this.loader.present();
        this.user.createUser(this.register)
        .then(re =>{
            this.loader.dismiss();
            if(re['err']==null){
                this.user.setLoggedUser(re);
                this.dismiss('success');
            }else if(re['err']=='EMAIL_EXISTS'){
                let alert = this.alert.create({
                    title: 'Email em Uso',
                    message: 'Parece que você já usou esse email para se cadastrar, gostaria de entrar em contato? <a href="http://cerveja.me">Cerveja.me</a>.',
                    buttons: ['Ok']
                });
                alert.present();
            }else{
                let alert = this.alert.create({
                    title: 'Erro',
                    message: 'Opa! Tivemos um erro, por favor tente novamente, se o erro persistir entre contato <a href="http://cerveja.me">Cerveja.me</a>.',
                    buttons: ['Ok']
                });
                alert.present();
            }
        })
        .catch(err=>{
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
        this.viewCtrl.dismiss('success');
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
            'erro ao cadastrar pelo facebook';
        });
    }

}
