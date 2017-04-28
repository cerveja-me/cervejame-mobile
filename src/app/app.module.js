var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { NgModule, ErrorHandler, LOCALE_ID } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { IonicImageLoader } from 'ionic-image-loader';
import { MyApp } from './app.component';
import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import { LoginPage } from '../pages/login/login';
import { ModalContentPage } from '../pages/modal-receipt/modal-receipt';
import { ModalTourPage } from '../pages/modal-tour/modal-tour';
import { ModalNotificationPage } from '../pages/modal-notification/modal-notification';
import { ModalAddressPage } from '../pages/modal-address/modal-address';
import { ModalMapPage } from '../pages/modal-map/modal-map';
import { ModalRegisterPage } from '../pages/modal-register/modal-register';
import { MapPage } from '../pages/map/map';
import { FinishPage } from '../pages/finish/finish';
import { FeedbackPage } from '../pages/feedback/feedback';
import { ModalSchedulePage } from '../pages/modal-schedule/modal-schedule';
import { User } from '../providers/user';
import { Device } from '../providers/device';
import { Sale } from '../providers/sale';
import { ConstantService } from '../providers/constant-service';
import { Analytics } from '../providers/analytics';
import { Error } from '../providers/error';
import { Storage } from '@ionic/storage';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';
var AppModule = (function () {
    function AppModule(_an) {
        this._an = _an;
        _an.startTrack();
    }
    return AppModule;
}());
AppModule = __decorate([
    NgModule({
        declarations: [
            MyApp, Page1, Page2, ModalContentPage, LoginPage,
            MapPage, FinishPage, ModalTourPage, ModalMapPage, FeedbackPage,
            ModalRegisterPage, ModalNotificationPage, ModalAddressPage, ModalSchedulePage
        ],
        imports: [
            IonicModule.forRoot(MyApp),
            IonicImageLoader
        ],
        bootstrap: [IonicApp],
        entryComponents: [
            MyApp, Page1, Page2, ModalContentPage, FeedbackPage,
            LoginPage, MapPage, FinishPage, ModalTourPage, ModalMapPage, ModalRegisterPage, ModalNotificationPage, ModalAddressPage, ModalSchedulePage
        ],
        providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler }, { provide: LOCALE_ID, useValue: "pt-BR" }, Analytics, User, Error, Device, Sale, Storage, ConstantService]
    }),
    __metadata("design:paramtypes", [Analytics])
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map