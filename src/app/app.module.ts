import { NgModule, ErrorHandler,LOCALE_ID } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import { LoginPage } from '../pages/login/login';
import { ModalContentPage } from '../pages/modal-receipt/modal-receipt';
import { ModalTourPage } from '../pages/modal-tour/modal-tour';
import { ModalMapPage } from '../pages/modal-map/modal-map';
import { ModalRegisterPage } from '../pages/modal-register/modal-register';
import { MapPage } from '../pages/map/map';
import { FinishPage } from '../pages/finish/finish';

import { User } from '../providers/user';
import { Device } from '../providers/device';
import { Sale } from '../providers/sale';

import { Storage } from '@ionic/storage';

@NgModule({
  declarations: [
  MyApp,Page1,Page2,ModalContentPage,LoginPage,
  MapPage,FinishPage,ModalTourPage,ModalMapPage,
  ModalRegisterPage
  ],
  imports: [
  IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
  MyApp,Page1,Page2,ModalContentPage,
  LoginPage,MapPage,FinishPage,ModalTourPage,ModalMapPage,ModalRegisterPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},{ provide: LOCALE_ID, useValue: "pt-BR" },User,Device,Sale,Storage]
})
export class AppModule {}
