import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';


import { DeviceProvider } from '../device/device';


@Injectable()
export class UserProvider {

    constructor(
        private storage:Storage,
        private fb: Facebook,
        private device:DeviceProvider
        ) {
        console.log('Hello UserProvider Provider');
    }


    isUserLogged(){
        return new Promise((resolve, reject) => {
            this.getLoggedUser()
            .then((o)=>{

                if(o!=null){
                    resolve( true);
                }else{
                    resolve(false);
                }
            });
        });
    }

    setLoggedUser(user){
        this.storage.set('user_logged',user);
    }

    getLoggedUser(){
        return new Promise((resolve, reject) => {
            this.storage.get('user_logged')
            .then((user)=>{
                resolve(user);
            });
        });
    }

    createUser(u){
        return new Promise((resolve, reject) => {
            u.device=this.device.getDevice().uuid;
            this.device.post(this.device.API+this.device.COSTUMER,u)
            .then((res)=>{
                this.setLoggedUser(res);
                resolve(res);
            })
            .catch(reject);
        })
    }

    loginUser(u){
        return new Promise((resolve, reject) => {
            u.device =this.device.getDevice().uuid;
            this.device.post(this.device.API+this.device.AUTH, u)
            .then((res)=>{
                resolve(res);
            })
            .catch(reject);
        })
    }
    updateUser(user){
        return new Promise((resolve, reject) => {
            user.device =this.device.getDevice().uuid;
            this.device.post(this.device.API+this.device.COSTUMER+this.device.COSTUMER_UPDATE, user)
            .then((res)=>{
                resolve(res);
            })
            .catch(reject);
        })
    }
    //verificar esse metodo na sequencia
    /*facebookRegister(fu){
        return new Promise((resolve, reject) => {
            let u ={
                name:fu.name,
                email:fu.email,
                password:fu.id,
                facebook_id:fu.id,
                facebook_token:fu.auth.accessToken
            }
            this.loginUser(u)
            .then(res =>{
                if(res['err']==null){
                    resolve(res);
                }else{
                    this.createUser(u)
                    .then(re =>{
                        if(res['err']==null){
                            resolve(res);
                        }else{
                            reject();
                        }
                    });
                }
            });
        });
    }*/
}
