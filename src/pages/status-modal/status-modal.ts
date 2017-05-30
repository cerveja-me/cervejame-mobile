import { Component } from '@angular/core';
import { NavController, NavParams,Events,ViewController } from 'ionic-angular';

import { OrderProvider } from '../../providers/order/order';
import { UserProvider } from '../../providers/user/user';
import { DeviceProvider } from '../../providers/device/device';

@Component({
    selector: 'page-status-modal',
    templateUrl: 'status-modal.html',
})
export class StatusModalPage {
    sale:any;
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public events:Events,
        public viewCtrl: ViewController,
        public device:DeviceProvider,
        public user:UserProvider,
        public order:OrderProvider) {
        this.events.subscribe('push:order_update', data=>{
            this.verifyLastSale();
        });

    }

    ionViewDidLoad() {
        this.device.camPage('status');
        this.verifyLastSale();
    }

    verifyLastSale(){
        this.order.getLastOpenSale()
        .then(ls=>{
            this.sale=ls;
        })
        .catch(e=>{
            this.viewCtrl.dismiss('empty');
        })
    }
    dismiss(){
        this.viewCtrl.dismiss('success');
    }


}

