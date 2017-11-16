import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicModule,IonicErrorHandler } from 'ionic-angular';
import { HttpClientModule, HttpClient} from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { IonicImageLoader } from 'ionic-image-loader';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Device } from '@ionic-native/device';
import { AppVersion } from '@ionic-native/app-version';
import { Geolocation } from '@ionic-native/geolocation';

import { DeviceProvider } from '../providers/device/device';
import { LocationProvider } from '../providers/location/location';
import { OrderProvider } from '../providers/order/order';
import { UserProvider } from '../providers/user/user';
import { VoucherProvider } from '../providers/voucher/voucher';
import { HttpProvider } from '../providers/http/http';
import { NetworkProvider } from '../providers/network/network';
import { ConstantsProvider } from '../providers/constants/constants';


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TourPage } from '../pages/tour/tour';
import { MapPage } from '../pages/map/map';
import { ModalLoginPage } from '../pages/modal-login/modal-login';
import { ModalCheckoutPage } from '../pages/modal-checkout/modal-checkout';
import { ModalVoucherPage } from '../pages/modal-voucher/modal-voucher';
import { FeedbackPage } from '../pages/feedback/feedback';
import { StatusPage } from '../pages/status/status';
import { ModalRegisterPage } from '../pages/modal-register/modal-register';

class AppVersionMock extends AppVersion {
  constructor(){super();}
  getVersionNumber(){return new Promise((resolve, reject) => {resolve( '3.0.5');})}
}

class DeviceMock extends Device{
  get cordova(): string{ return "7.0.1";}
  get isVirtual(): boolean { return true;}
  get manufacturer() : string { return "Desenvolvimento";}
  get model() : string { return "Browser - Chrome";}
  get platform() : string { return "Browser";}
  get serial() : string { return "unknown";}
  get uuid() : string { return "5e6d88c-83dad11-e7a91992-ebcb67fe33";}
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
    ModalCheckoutPage,
    ModalVoucherPage,
    FeedbackPage,
    StatusPage,
    ModalRegisterPage

  ],
  imports: [
    HttpClientModule,
    BrowserModule,
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
    ModalCheckoutPage,
    ModalVoucherPage,
    FeedbackPage,
    StatusPage,
    ModalRegisterPage
  ],
  providers: [
    DeviceProvider,
    LocationProvider,
    OrderProvider,
    UserProvider,
    VoucherProvider,
    HttpProvider,
    NetworkProvider,
    ConstantsProvider,
    StatusBar,
    SplashScreen,
    Device,
    AppVersion,
    Geolocation,
    {provide: AppVersion, useClass: AppVersionMock},
    {provide: SplashScreen, useClass:SplashScreenMock},
    {provide: Device, useClass: DeviceMock},
    // {provide:Geolocation,useCass:GeolocationMock},
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
