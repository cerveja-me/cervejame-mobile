import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,LoadingController } from 'ionic-angular';

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
        public user:UserProvider,
        public device:DeviceProvider
        )
    {
    }
    ionViewDidLoad() {
        this.device.camPage('register');
    }

    createUser(){
        // this.device.displayLoading();
        this.user.createUser(this.register)
        .then(re =>{
            // this.device.hideLoading();
            if(re['err']==null){
                this.user.setLoggedUser(re);
                this.dismiss('success');
            }else{
                // this.loader.dismiss();
                console.log('cadastro com erro ->',re);
            }
        })
        .catch(err=>{
            // this.device.hideLoading();
            console.log('err->',err);
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
