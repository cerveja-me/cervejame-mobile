import { Component,ViewChild } from '@angular/core';
import { NavController, NavParams,Slides } from 'ionic-angular';
import { Storage } from '@ionic/storage';

//pages
import { HomePage } from '../home/home';
//providers
import { DeviceProvider } from '../../providers/device/device';
import { GeolocationProvider } from '../../providers/geolocation/geolocation';

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
     @ViewChild('slides') slides: Slides;
     constructor(
         public navCtrl: NavController,
         public navParams: NavParams,
         public storage:Storage,
         public device:DeviceProvider,
         public geoloc:GeolocationProvider

         ) {

     }

     ionViewDidLoad() {
         this.device.camPage("tour");
     }

     startApp() {
         this.navCtrl.setRoot(HomePage).then(() => {
             this.storage.set('hasSeenTutorial', 'true');
         })
     }

     onSlideChangeStart(slider: Slides) {
         if(slider.realIndex==1){
             this.geoloc.getPosition();
         }
     }
 }

