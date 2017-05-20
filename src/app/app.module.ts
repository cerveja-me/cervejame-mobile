import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';
import { Device } from '@ionic-native/device';
import { AppVersion } from '@ionic-native/app-version';

import { HttpModule } from '@angular/http';

//pages
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TourPage } from '../pages/tour/tour';

//providers
import { DeviceProvider } from '../providers/device/device';

class DeviceMock extends Device{
  get cordova(): string{ return "6.2.3";}
  // get isVirtual(): boolean { return false;}
  get manufacturer() : string { return "Desenvolvimento";}
  get model() : string { return "Browser - Chrome";}
  get platform() : string { return "Browser";}
  get serial() : string { return "unknown";}
  get uuid() : string { return "5e6d88c83dad11e7a91992ebcb67fe33";}
  get version(): string { return "7.1.1"; }
}

class AppVersionMock extends AppVersion{
  constructor(){
    super();
  }
  getVersionNumber(){
    return new Promise((resolve, reject) => {
      resolve( '2.0.1');
    })
  }
}

@NgModule({
  declarations: [
  MyApp,
  HomePage,
  TourPage
  ],
  imports: [
  HttpModule,
  BrowserModule,
  IonicModule.forRoot(MyApp) ,
  IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
  MyApp,
  HomePage,
  TourPage
  ],
  providers: [
  StatusBar,
  SplashScreen,
  Device,
  AppVersion,
  // {provide:AppVersion,useClass:AppVersionMock},
  // {provide:Device,useClass:DeviceMock},
  {provide: ErrorHandler, useClass: IonicErrorHandler},
  DeviceProvider
  ]
})
export class AppModule {}
