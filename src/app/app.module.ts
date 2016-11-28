import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { TourPage } from '../pages/tour/tour';
import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import { LoginPage } from '../pages/login/login';
import { ModalContentPage } from '../pages/modal-receipt/modal-receipt';
import { ModalTourPage } from '../pages/modal-tour/modal-tour';
import {MapPage} from '../pages/map/map';
import {FinishPage} from '../pages/finish/finish';

import { User } from '../providers/user';
import { Storage } from '@ionic/storage';

@NgModule({
  declarations: [
  MyApp,
  Page1,
  Page2,
  ModalContentPage,
  LoginPage,
  MapPage,
  FinishPage,
  ModalTourPage
  ],
  imports: [
  IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
  MyApp,
  Page1,
  Page2,
  ModalContentPage,
  LoginPage,
  MapPage,
  FinishPage,
  ModalTourPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},User,Storage]
})
export class AppModule {}
