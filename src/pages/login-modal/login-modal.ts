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
            console.log('erro ao cadastrar pelo facebook');
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
            this.dismiss('success');
            console.log('e->',e);
            //qual erro
            //qual msg
        })
    }

    dismiss(re){
        this.viewCtrl.dismiss(re);
    }

    // private doFbLogin(){
        //   return new Promise((resolve, reject) => {
            //     let permissions = new Array();

            //     //the permissions your facebook app needs from the user
            //     permissions = ["public_profile","email"];
            //     Facebook.login(permissions)
            //     .then(function(response){
                //       let userId = response.authResponse.userID;
                //       let params = new Array();

                //       //Getting name and gender properties
                //       Facebook.api("/me?fields=name,gender,email", params)
                //       .then(function(user) {
                    //         user.picture = "https://graph.facebook.com/" + userId + "/picture?type=large";
                    //         user.auth=response.authResponse;
                    //         console.log('user->',user);
                    //         resolve(user);
                    //       })
                    //     }, function(error){

                        //       console.log('erro->',error);
                        //       reject(error);
                        //     });
                        //   })
                        // }
                        // doLoginForm(){
                            //   this.loader.present();
                            //   this._user.loginUser(this.login)
                            //   .then(u =>{
                                //     this.loader.dismiss();
                                //     if(u['err'] == null ){
                                    //       this._user.setLoggedUser(u);
                                    //     }else{
                                        //       let alert = this.alerCtrl.create({
                                            //         title: 'Dados Invalidos',
                                            //         message: 'Parece que você errou sua senha, cuidado quando for utilizar o aplicativo enquanto estiver alcoolizado.',
                                            //         buttons: ['Ok']
                                            //       });
                                            //       alert.present();
                                            //     }
                                            //   })

                                            // }
                                            // facebookRegister(){
                                                //   this.doFbLogin()
                                                //   .then((user)=>{
                                                    //     this._user.facebookRegister(user)
                                                    //     .then((result)=>{
                                                        //       this._user.setLoggedUser(result);
                                                        //       this.gotomap();
                                                        //     })
                                                        //   })
                                                        // }
                                                        // openModalRegister(){
                                                            //   let modal = this.modalCtrl.create(ModalRegisterPage);
                                                            //   modal.present();
                                                            //   modal.onWillDismiss(f =>{
                                                                //     if(f!=null){
                                                                    //       this.gotomap();
                                                                    //     }else{
                                                                        //       this._user.isUserLogged()
                                                                        //       .then(log=>{
                                                                            //         if(log){
                                                                                //           this.gotomap();
                                                                                //         }
                                                                                //       })
                                                                                //     }

                                                                                //   })
                                                                                // }
                                                                            }
