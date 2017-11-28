import { Component } from '@angular/core';
import { NavController, NavParams,ViewController,ModalController } from 'ionic-angular';

//providers
import { UserProvider } from '../../providers/user/user';

//relatedPages
import { ModalRegisterPage } from '../modal-register/modal-register';
@Component({
  selector: 'page-modal-login',
  templateUrl: 'modal-login.html',
})
export class ModalLoginPage {
  profile:any={
    login:null,
    password:null
  };
  constructor(
    private user:UserProvider,
    private viewCtrl:ViewController,
    private modalCtrl:ModalController,
  ) {
  }

  ionViewDidLoad() {
    // this.user.profileLogin(this.u);
    // console.log('ionViewDidLoad ModalLoginPage');
  }

  doLoginForm(){
    this.user.profileLogin(this.profile)
    .then(res=>{
      this.viewCtrl.dismiss('success');
    })
    .catch( e =>{
      console.log('erro -> ', e);
    })
  }

  openModalRegister(){
    let modal = this.modalCtrl.create(ModalRegisterPage);
    modal.present();
    modal.onDidDismiss(data => {
      if(data==='success'){
        this.viewCtrl.dismiss('success');
      }else{
        // this.device.camPage('login');
      }
    });
  }

  doFacebookRegister(){
        // this.loader=this.load.create({content: this.device.getRandonLoading()});
        // this.loader.present();
        this.user.facebookRegister()
        .then(u=>{
            // this.loader.dismiss();
            this.viewCtrl.dismiss('success');
        })
        .catch(e=>{
          console.log('error face-> ',e);
            // this.dismiss('success');
        });
    }

}
