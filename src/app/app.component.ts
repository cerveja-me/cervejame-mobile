import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { TourPage } from '../pages/tour/tour';
import { FeedbackPage } from '../pages/feedback/feedback';

import { MapPage } from '../pages/map/map';

import { FinishPage } from '../pages/finish/finish';
import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import { ModalMapPage } from '../pages/modal-map/modal-map';
import { ModalTourPage } from '../pages/modal-tour/modal-tour';
import { User } from '../providers/user';
import { Sale } from '../providers/sale';

declare var UXCam:any;

// declare var Appsee:any;




@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = Page1;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
    { title: 'Page One', component: Page1 },
    { title: 'Page Two', component: Page2 }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      UXCam.startWithKey("eb717cc41850c30");

      // Appsee.start("d38be6c0c94d4c0a8a65b7968cf2fd41");

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
