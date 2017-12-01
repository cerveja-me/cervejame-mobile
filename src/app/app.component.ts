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
        // this.firebase.getToken()
        // .then(token => console.log(`The token is ${token}`)) // save the token server-side and use it to push notifications to this device
        // .catch(error => console.error('Error getting token', error));
        // Okay, so the platform is ready and our plugins are available.
        // Here you can do any higher level native things you might need.

        this.statusBar.styleDefault();
        setTimeout(() => {
          this.splashScreen.hide();
        }, 500);
      });
    }

    // openPage(page) {
    //   // Reset the content nav to have just this page
    //   // we wouldn't want the back button to show in this scenario
    //   this.nav.setRoot(page.component);
    // }
  }
