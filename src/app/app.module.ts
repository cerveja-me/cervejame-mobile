import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { HttpClientModule, HttpClient} from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { AppProviders } from './app.providers';
import { IonicImageLoader } from 'ionic-image-loader';


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TourPage } from '../pages/tour/tour';
import { MapPage } from '../pages/map/map';
import { ModalLoginPage } from '../pages/modal-login/modal-login';
import { ModalCheckoutPage } from '../pages/modal-checkout/modal-checkout';
import { ModalVoucherPage } from '../pages/modal-voucher/modal-voucher';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TourPage,
    ModalLoginPage,
    MapPage,
    ModalCheckoutPage,
    ModalVoucherPage
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
    ModalVoucherPage
  ],
  providers: AppProviders.getProviders()
})
export class AppModule {}
