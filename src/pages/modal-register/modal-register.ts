import { Component } from '@angular/core';
import {ViewController } from 'ionic-angular';

//providers
import { UserProvider } from '../../providers/user/user';

@Component({
  selector: 'page-modal-register',
  templateUrl: 'modal-register.html',
})
export class ModalRegisterPage {
  profile:any={
    name:'',
    password:'',
    login:'',
    type:1,
    status:1
  }
  constructor(
    private user:UserProvider,
    private viewCtrl:ViewController,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalRegisterPage');
  }

  createUser(){
    this.user.profileSignUp(this.profile)
    .then(r=>{
        this.viewCtrl.dismiss('success');
    })
    .catch(e=>{
      console.log('erro cadastro ->',e);
    })
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
            // this.dismiss('success');
        });
    }




}
