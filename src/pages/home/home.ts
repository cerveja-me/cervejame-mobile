import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { DeviceProvider } from '../../providers/device/device';
import { GeolocationProvider } from '../../providers/geolocation/geolocation';
import { OrderProvider } from '../../providers/order/order';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    constructor(
        public navCtrl: NavController,
        public device:DeviceProvider,
        public order:OrderProvider
        ) {
        this.device.camPage('home');
        //        this.device.startPush(); ver qual é o melhor momento pra ativar isso
        this.getZone();
    }
    //liberar o push

    //buscar zona
    //buscar produtos

    //não estar com a geoliberada
    //nao estar em uma zona valida
    //estar sem conexão com a internet
    //zona valida
    //produtos
    getZone(){
        this.order.getZone()
        .then(z=>{
            console.log('zone->',z);
        })
    }

    ionViewDidLoad() {
        this.device.camPage('home');
    }
}
