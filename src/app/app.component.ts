import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
// import { Firebase } from '@ionic-native/firebase';

import { HomePage } from '../pages/home/home';
import { TourPage } from '../pages/tour/tour';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  // @ViewChild(Nav) nav: Nav;

  rootPage: any; // = HomePage;

  // pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    // public firebase:Firebase,
    private storage:Storage) {
      this.storage.get('hasSeenTutorial')
      .then((hasSeenTutorial) => {
        if (hasSeenTutorial) {
          this.rootPage = HomePage;
        } else {
          this.rootPage = TourPage;
        }

        this.initializeApp();
      })


    }

    initializeApp() {

      this.platform.ready().then(() => {

        this.statusBar.styleDefault();
        setTimeout(() => {
          this.splashScreen.hide();
        }, 500);
      });
    }

  }
