import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

//providers
import { NetworkProvider } from '../network/network';
import { DeviceProvider } from '../device/device';

@Injectable()
export class UserProvider {

  constructor(
    private network:NetworkProvider,
    private device:DeviceProvider,
    private storage:Storage
  ){

  }

  profileLogin(p){
    return new Promise((resolve, reject)=> {
      this.device.getDevice()
      .then( d =>{
        p.device_id=d.id;
        this.network.post(this.network.c.AUTH,p)
        .then( t=>{
          this.storage.set(this.network.c.AUTH,t.token);
          resolve(t);
        })
      })
      .catch( e => {
        reject(e);
      })
    })
  }

  profileSignUp(p){

  }


}
