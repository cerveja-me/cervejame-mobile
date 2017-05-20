import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Storage } from '@ionic/storage';

import { HomePage } from '../pages/home/home';
import { TourPage } from '../pages/tour/tour';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public storage: Storage

    ) {
    this.storage.get('hasSeenTutorial')
    .then((hasSeenTutorial) => {
      console.log('tour->',hasSeenTutorial);
      if (hasSeenTutorial) {

        this.rootPage = HomePage;
      } else {
        this.rootPage = TourPage;
      }
      this.startApp();
    });

  }
  startApp(){

    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      setTimeout(() => {
        this.splashScreen.hide();
      }, 500);
    });
  }
}

