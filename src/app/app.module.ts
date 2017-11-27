import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, LOCALE_ID } from '@angular/core';
import { IonicApp, IonicModule,IonicErrorHandler,Config } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { IonicImageLoader } from 'ionic-image-loader';
import { ComponentsModule } from '../components/components.module';

import { ModalScaleUpEnterTransition } from './scale-up-enter.transition';
import { ModalScaleUpLeaveTransition } from './scale-up-leave.transition';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Device } from '@ionic-native/device';
import { AppVersion } from '@ionic-native/app-version';
import { Geolocation } from '@ionic-native/geolocation';
import { Facebook } from '@ionic-native/facebook';
import { Keyboard } from '@ionic-native/keyboard';
import { OneSignal } from '@ionic-native/onesignal';

import { DeviceProvider } from '../providers/device/device';
import { LocationProvider } from '../providers/location/location';
import { OrderProvider } from '../providers/order/order';
import { UserProvider } from '../providers/user/user';
import { VoucherProvider } from '../providers/voucher/voucher';
import { NetworkProvider } from '../providers/network/network';
import { ConstantsProvider } from '../providers/constants/constants';


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TourPage } from '../pages/tour/tour';
import { MapPage } from '../pages/map/map';
import { ModalLoginPage } from '../pages/modal-login/modal-login';
import { CheckoutPage } from '../pages/checkout/checkout';
import { ModalVoucherPage } from '../pages/modal-voucher/modal-voucher';
import { FeedbackPage } from '../pages/feedback/feedback';
import { StatusPage } from '../pages/status/status';
import { ModalRegisterPage } from '../pages/modal-register/modal-register';
import { ModalSchedulePage } from '../pages/modal-schedule/modal-schedule';
import { ModalNotificationPage } from '../pages/modal-notification/modal-notification';

import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';
registerLocaleData(ptBr)

class FacebookMock extends Facebook{
  constructor(){super();}
  login(permissions: string[]) {
    return new Promise((resolve, reject) => {
      resolve(
        {
          status: "connected",
          authResponse: {
            session_key: true,
            accessToken: "aoijaoisjdo",
            expiresIn: 5183979,
            sig: "...",
            secret: "...",
            userID: "100110"
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
            id: "191919191",
            name: "Jeferson Solis de la Torre",
            first_name: "Jeferson",
            last_name: "Solis de la Torre",
            gender: "male",
            email:"matiassolis@gmail.com"
          }
        )
      })

    }

    return new Promise((resolve, reject) => {
      resolve(
        {
          data: {
            is_silhouette: false,
            url: "Thumbnail"
          }
        }
      )
    })

  }

}
class AppVersionMock extends AppVersion {
constructor(){super();}
getVersionNumber(){return new Promise((resolve, reject) => {resolve( '3.0.5');})}
}
class KeyboardMock extends Keyboard {

  constructor() {super();}
  show(){}
  close(){}
}

class DeviceMock extends Device{
  get cordova(): string{ return "7.0.1";}
  get isVirtual(): boolean { return true;}
  get manufacturer() : string { return "Desenvolvimento";}
  get model() : string { return "Browser - Chrome";}
  get platform() : string { return "Browser";}
  get serial() : string { return "unknown";}
  get uuid() : string { return "1231231-83dad11-e7a91992-ebcb67fe33";}
  get version(): string { return "7.1.1"; }
}

class SplashScreenMock extends SplashScreen{
  hide(){}
}


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TourPage,
    ModalLoginPage,
    MapPage,
    CheckoutPage,
    ModalVoucherPage,
    FeedbackPage,
    StatusPage,
    ModalRegisterPage,
    ModalSchedulePage,
    ModalNotificationPage
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    ComponentsModule,
    IonicStorageModule.forRoot(),
    IonicImageLoader.forRoot(),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TourPage,
    ModalLoginPage,
    MapPage,
    CheckoutPage,
    ModalVoucherPage,
    FeedbackPage,
    StatusPage,
    ModalRegisterPage,
    ModalSchedulePage,
    ModalNotificationPage
  ],
  providers: [
    DeviceProvider,
    LocationProvider,
    OrderProvider,
    UserProvider,
    VoucherProvider,
    NetworkProvider,
    ConstantsProvider,
    StatusBar,
    SplashScreen,
    Device,
    AppVersion,
    Geolocation,
    OneSignal,
    { provide: Facebook, useClass: FacebookMock },
    { provide: AppVersion, useClass: AppVersionMock },
    { provide: SplashScreen, useClass:SplashScreenMock },
    { provide: Device, useClass: DeviceMock },
    { provide: Keyboard,useClass:KeyboardMock },//coment before build to mobile
    // {provide:Geolocation,useCass:GeolocationMock},
    { provide: LOCALE_ID, useValue: 'pt-PT' },
    { provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {
  constructor(public config: Config) {
    this.setCustomTransitions();
  }

  private setCustomTransitions() {
    this.config.setTransition('modal-scale-up-leave', ModalScaleUpLeaveTransition);
    this.config.setTransition('modal-scale-up-enter', ModalScaleUpEnterTransition);
  }
}
