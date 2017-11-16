import { ErrorHandler } from '@angular/core';
import { IonicErrorHandler } from 'ionic-angular';

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

class AppVersionMock extends AppVersion {
  constructor(){super();}
  getVersionNumber(){return new Promise((resolve, reject) => {resolve( '2.0.1');})}
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



export class AppProviders {

  public static getProviders() {

    let providers;

    if(document.URL.includes('https://') || document.URL.includes('http://')){

      // Use browser providers
      providers = [
        StatusBar,
        SplashScreen,
        Device,
        AppVersion,
        Geolocation,
        {provide: AppVersion, useClass: AppVersionMock},
        {provide: SplashScreen, useClass:SplashScreenMock},
        {provide: Device, useClass: DeviceMock},
        {provide: ErrorHandler, useClass: IonicErrorHandler}
      ];

    } else {

      // Use device providers
      providers = [
        StatusBar,
        SplashScreen,
        Device,
        AppVersion,
        Geolocation,
        {provide: ErrorHandler, useClass: IonicErrorHandler}
      ];

    }
    providers=providers.concat([
      DeviceProvider,
      LocationProvider,
      OrderProvider,
      UserProvider,
      VoucherProvider,
      HttpProvider,
      NetworkProvider,
      ConstantsProvider
    ])

    return providers;

  }

}
