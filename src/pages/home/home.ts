import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { DeviceProvider } from '../../providers/device/device';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    constructor(
        public navCtrl: NavController,
        public device:DeviceProvider
        ) {
    }

}
