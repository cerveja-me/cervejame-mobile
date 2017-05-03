import {App, Platform} from 'ionic-angular';
import { Injectable } from '@angular/core';
//import { GoogleAnalytics } from 'ionic-native';

/*
  Generated class for the Analytics provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
    */
  @Injectable()
  export class Analytics {

    constructor(public platform:Platform) {
      //GoogleAnalytics.startTrackerWithId("UA-88184207-3");

    }

    startTrack(){
      this.platform.ready().then(() => {
        //GoogleAnalytics.startTrackerWithId("UA-88184207-3");
      })

    }
    trackView(v,campaing){
      //GoogleAnalytics.trackView(v, campaing, false);
    }

    time(category, intervalInMilliseconds, variable, label){
      //GoogleAnalytics.trackTiming(category, intervalInMilliseconds, variable, label)
    }
    button(category: string, action: string, label?: string, value?: number, newSession?: boolean){
      //GoogleAnalytics.trackEvent(category, action, label, value, newSession);
    }


  }
