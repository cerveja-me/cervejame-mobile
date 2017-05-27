import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule,LOCALE_ID } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';
import { Device } from '@ionic-native/device';
import { AppVersion } from '@ionic-native/app-version';
import { Push } from '@ionic-native/push';
import { Geolocation } from '@ionic-native/geolocation';
import { IonicImageLoader } from 'ionic-image-loader';
import { Facebook } from '@ionic-native/facebook';

import { HttpModule } from '@angular/http';

//pages
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TourPage } from '../pages/tour/tour';
import { MapPage } from '../pages/map/map';
import { HomeConfirmModalPage } from '../pages/home-confirm-modal/home-confirm-modal';
import { LoginModalPage } from '../pages/login-modal/login-modal';
import { RegisterModalPage } from '../pages/register-modal/register-modal';
import { CheckoutModalPage } from '../pages/checkout-modal/checkout-modal';
import { ScheduleModalPage } from '../pages/schedule-modal/schedule-modal';
import { StatusModalPage } from '../pages/status-modal/status-modal';
import { FeedbackModalPage } from '../pages/feedback-modal/feedback-modal';

//providers
import { DeviceProvider } from '../providers/device/device';
import { GeolocationProvider } from '../providers/geolocation/geolocation';
import { OrderProvider } from '../providers/order/order';
import { UserProvider } from '../providers/user/user';

import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

class DeviceMock extends Device{
  get cordova(): string{ return "6.2.3";}
  get isVirtual(): boolean { return true;}
  get manufacturer() : string { return "Desenvolvimento";}
  get model() : string { return "Browser - Chrome";}
  get platform() : string { return "Browser";}
  get serial() : string { return "unknown";}
  get uuid() : string { return "5e6d88c83dad11e7a91992ebcb67fe33";}
  get version(): string { return "7.1.1"; }
}

class AppVersionMock extends AppVersion {
  constructor(){super();}
  getVersionNumber(){return new Promise((resolve, reject) => {resolve( '2.0.1');})}
}
class PushMock extends Push {
  constructor(){super();}

}
class FacebookMock extends Facebook{
  constructor(){super();}
  login(permissions: string[]) {
    return new Promise((resolve, reject) => {
      resolve(
      {
        status: "connected",
        authResponse: {
          session_key: true,
          accessToken: "kgkh3g42kh4g23kh4g2kh34g2kg4k2h4gkh3g4k2h4gk23h4gk2h34gk234gk2h34AndSoOn",
          expiresIn: 5183979,
          sig: "...",
          secret: "...",
          userID: "634565435"
        }
      }
      )
    })
  }

  api(requestPath: string, permissions: string[]): Promise<any> {

    if (requestPath == '/me?fields=id,name,email,first_name,last_name,gender') {
      return new Promise((resolve, reject) => {
        resolve(
        {
          "id": "99999999999999",
          "name": "Matias Solis de la Torre",
          "first_name": "Matias",
          "last_name": "Solis de la Torre",
          "gender": "male",
          "email":"matiassolis@gmail.com"
        }
        )
      })

    }

    return new Promise((resolve, reject) => {
      resolve(
      {
        "data": {
          "is_silhouette": false,
          "url": "Thumbnail"
        }
      }
      )
    })

  }

}


class GeolocationMock extends Geolocation {
  constructor(){super();}

  // getCurrentPosition(){
    //   return new Promise((resolve, reject) => {
      //     resolve({coords:{Coordinatesaccuracy: 20,latitude:-22.226555,longitude: -54.810209,timestamp: 1495480276346}});
      //   })
      // }

    }

    // class FacebookMock extends Facebook{
      //   constructor(){super;}

      // }

      @NgModule({
        declarations: [
        MyApp,
        HomePage,
        TourPage,
        HomeConfirmModalPage,
        MapPage,
        LoginModalPage,
        RegisterModalPage,
        CheckoutModalPage,
        ScheduleModalPage,
        StatusModalPage,
        FeedbackModalPage
        ],
        imports: [
        HttpModule,
        BrowserModule,
        IonicModule.forRoot(MyApp) ,
        IonicStorageModule.forRoot(),
        IonicImageLoader.forRoot()
        ],
        bootstrap: [IonicApp],
        entryComponents: [
        MyApp,
        HomePage,
        TourPage,
        HomeConfirmModalPage,
        MapPage,
        LoginModalPage,
        RegisterModalPage,
        CheckoutModalPage,
        ScheduleModalPage,
        StatusModalPage,
        FeedbackModalPage
        ],
        providers: [
        StatusBar,
        SplashScreen,
        Device,
        AppVersion,
        Push,
        Geolocation,
        Facebook,
/*        {provide:Facebook,useClass:FacebookMock}, //coment before build to mobile
        {provide:Device,useClass:DeviceMock}, //coment before build to mobile
        {provide:AppVersion,useClass:AppVersionMock},//coment before build to mobile
        {provide:Push,useClass:PushMock},//coment before build to mobile
        {provide:Geolocation,useClass:GeolocationMock},//coment before build to mobile
        */
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        DeviceProvider,
        GeolocationProvider,
        OrderProvider,
        UserProvider
        ]
      })
      export class AppModule {}
