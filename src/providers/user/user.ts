import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';

//providers
import { NetworkProvider } from '../network/network';
import { DeviceProvider } from '../device/device';

@Injectable()
export class UserProvider {

  constructor(
    private network:NetworkProvider,
    private device:DeviceProvider,
    private storage:Storage,
    private fb: Facebook,
  ){

  }

  profileLogin(p){
    return new Promise((resolve, reject)=> {
      this.device.getDevice()
      .then( d =>{
        p.device_id=d['id'];
        this.network.post(this.network.c.AUTH,p)
        .then( t=>{
          this.storage.set(this.network.c.AUTH,t['token']);
          resolve(t);
        })
        .catch(reject)
      })
      .catch( reject)
    })
  }

  profileSignUp(p){
    return new Promise((resolve, reject)=> {
      this.network.post(this.network.c.PROFILE,p)
      .then( res=>{
        console.log('res',res);
        resolve(this.profileLogin(p));
      })
      .catch(reject)
    })
  }

  facebookData(){
    return new Promise((resolve, reject) => {
      let permissions = new Array();
      permissions = ["public_profile","email"];
      this.fb.login(permissions)
      .then(data=>{
        let params=new Array();
        this.fb.api("/me?fields=id,name,email,first_name,last_name,gender", params)
        .then(user=>{
          user.auth=data.authResponse;
          resolve(user);
        })
        .catch( e =>{
          reject(e);
        });
      })
      .catch(reject);
    })
  }



  facebookRegister(){
    return new Promise((resolve, reject) => {
      this.facebookData()
      .then(fu=>{
        let u ={
          name:fu['name'],
          email:fu['email'],
          password:fu['id'],
          facebook_id:fu['id'],
          facebook_token:fu['auth']['accessToken'],
          login:fu['id'],
          type:2,
          status:1
        }

        this.profileLogin({login:fu['id'],password:fu['id']})
        .then(res =>{
          resolve(res);
        })
        .catch(e=>{
          this.profileSignUp(u)
          .then(re =>{
            resolve(re);
          })
          .catch(e=>{
            //tratar erro com o login
            reject(e);
          })
        });
      })
      .catch(reject);
    });
  }



}
