import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import { LoginPage } from '../pages/login/login';
import { ModalContentPage } from '../pages/modal-receipt/modal-receipt';
import { ModalTourPage } from '../pages/modal-tour/modal-tour';
import { ModalMapPage } from '../pages/modal-map/modal-map';
import { MapPage } from '../pages/map/map';
import { FinishPage } from '../pages/finish/finish';

import { User } from '../providers/user';
import { Device } from '../providers/device';
import { Sale } from '../providers/sale';

import { Storage } from '@ionic/storage';

@NgModule({
  declarations: [
  MyApp,Page1,Page2,ModalContentPage,LoginPage,
  MapPage,FinishPage,ModalTourPage,ModalMapPage
  ],
  imports: [
  IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
  MyApp,Page1,Page2,ModalContentPage,
  LoginPage,MapPage,FinishPage,ModalTourPage,ModalMapPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},User,Device,Sale,Storage]
})
export class AppModule {}
