import { Component } from '@angular/core';
import { NavController, NavParams,ViewController } from 'ionic-angular';

import { Keyboard } from '@ionic-native/keyboard';

import { DeviceProvider } from '../../providers/device/device';
import { GeolocationProvider } from '../../providers/geolocation/geolocation';

@Component({
  selector: 'page-map-address',
  templateUrl: 'map-address.html',
})
export class MapAddressPage {

addressOptions:any={} ;
fulladdress:String='';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public geoLoc:GeolocationProvider,
    public device:DeviceProvider,
    private keyboard:Keyboard

  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapAddressPage');
  }

  addressChange(){
    if(this.fulladdress.length >3){
        this.geoLoc.getLocationsWithAddres(this.fulladdress)
        .then((listAddress)=>{
            this.addressOptions=listAddress['results'];
        })
    }
  }
  setAddress(address){
     this.keyboard.close()
       setTimeout(() => {
        this.viewCtrl.dismiss(address);
     }, 300);

 }
}
