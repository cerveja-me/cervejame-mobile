import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, LOCALE_ID } from '@angular/core';
import { IonicApp, IonicModule,IonicErrorHandler,Config } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { IonicImageLoader } from 'ionic-image-loader';
import { ComponentsModule } from '../components/components.module';

import { ModalScaleUpEnterTransition } from './scale-up-enter.transition';
import { ModalScaleUpLeaveTransition } from './scale-up-leave.transition';
import { MyErrorHandler} from './errorhandler';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Device } from '@ionic-native/device';
import { AppVersion } from '@ionic-native/app-version';
import { AppVersionMock } from './mocks/appversion/app-version.mock';
import { Geolocation } from '@ionic-native/geolocation';
import { OneSignal } from '@ionic-native/onesignal';
import { Facebook } from '@ionic-native/facebook';
import { Keyboard } from '@ionic-native/keyboard';
import { Firebase } from '@ionic-native/firebase';
import { FirebaseDynamicLinks } from '@ionic-native/firebase-dynamic-links';
import { Deeplinks } from '@ionic-native/deeplinks';
import { SocialSharing } from '@ionic-native/social-sharing';

// import { GeolocationMock } from './geolocation/geolocation.mock';
// import { FacebookMock } from './mocks/facebook/facebook.mock';

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
import { ProfilePage } from '../pages/profile/profile';

import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';
registerLocaleData(ptBr)

class KeyboardMock extends Keyboard {

  constructor() {super();}
  show(){}
  close(){}
}

class DeviceMock extends Device{
  get cordova(): string{ return "7.1.1";}
  get isVirtual(): boolean { return true;}
  get manufacturer() : string { return "Deassdenvolvimento";}
  get model() : string { return "Browser - Chrasdome";}
  get platform() : string { return "Browsasder";}
  get serial() : string { return "unknoasdwn";}
  get uuid() : string { return "1231231-8asd3dad11-e7a91992-ebcb67fe33";}
  get version(): string { return "7.1asd.1"; }
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
    ModalNotificationPage,
    ProfilePage
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
    ModalNotificationPage,
    ProfilePage
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
    Facebook,
    Firebase,
    Keyboard,
    Deeplinks,
    FirebaseDynamicLinks,
    SocialSharing,
    // {provide:Geolocation, useCass:GeolocationMock},
    // { provide: Facebook, useClass: FacebookMock },
    { provide: AppVersion, useClass: AppVersionMock },
    // { provide: SplashScreen, useClass:SplashScreenMock },
    { provide: Device, useClass: DeviceMock },
    { provide: Keyboard,useClass:KeyboardMock },//coment before build to mobile

    { provide: LOCALE_ID, useValue: 'pt-PT' },
    { provide: ErrorHandler, useClass: MyErrorHandler}
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
