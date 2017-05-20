import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

//pages
import { HomePage } from '../home/home';
//providers
import { DeviceProvider } from '../../providers/device/device';

/**
 * Generated class for the TourPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

 @Component({
     selector: 'page-tour',
     templateUrl: 'tour.html',
 })
 export class TourPage {

     constructor(
         public navCtrl: NavController,
         public navParams: NavParams,
         public storage:Storage,
         public device:DeviceProvider
         ) {

     }

     ionViewDidLoad() {
         console.log('ionViewDidLoad TourPage');
     }

     startApp() {
         this.navCtrl.push(HomePage).then(() => {
             this.storage.set('hasSeenTutorial', 'true');
         })
     }

 }

