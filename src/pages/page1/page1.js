var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { LoadingController, AlertController, ModalController, Platform, Events, App } from 'ionic-angular';
import { ModalContentPage } from '../modal-receipt/modal-receipt';
import { ModalTourPage } from '../modal-tour/modal-tour';
import { ModalNotificationPage } from '../modal-notification/modal-notification';
import { FeedbackPage } from '../feedback/feedback';
import { ModalSchedulePage } from '../modal-schedule/modal-schedule';
import { FinishPage } from '../finish/finish';
import { User } from '../../providers/user';
import { Device } from '../../providers/device';
import { Sale } from '../../providers/sale';
// declare var UXCam:any;
var Page1 = (function () {
    function Page1(modalCtrl, _device, _user, _loading, _sale, alertCtrl, platform, app, events) {
        var _this = this;
        this.modalCtrl = modalCtrl;
        this._device = _device;
        this._user = _user;
        this._loading = _loading;
        this._sale = _sale;
        this.alertCtrl = alertCtrl;
        this.platform = platform;
        this.app = app;
        this.events = events;
        this.products = [];
        this.closed = false;
        this.loadedcompleted = false;
        this.loader = this._loading.create({
            content: this._device.getRandonLoading()
        });
        this.sliderOptions = {
            slidesPerView: 2,
            centeredSlides: true,
            loop: true
        };
        this.platform.ready().then(function (readySource) {
            _this.app.setScrollDisabled(true);
            // UXCam.tagScreenName('home');
            _this.verifyFirstTime();
            _this.verifySaleFeedback();
            _this.verifyLastSale();
            _this.events.subscribe('push:order_update', function (data) {
                _this.verifySaleFeedback();
                _this.verifyLastSale();
            });
        });
    }
    Page1.prototype.verifyLastSale = function () {
        var _this = this;
        this._user.getLastSale()
            .then(function (sale) {
            console.log('asda');
            if (sale) {
                _this.sale = sale;
            }
        })
            .catch(function (e) {
        });
    };
    Page1.prototype.openSchedule = function () {
        var modal = this.modalCtrl.create(ModalSchedulePage, { hours: this.hours });
        modal.present();
    };
    Page1.prototype.openSale = function () {
        var modal = this.modalCtrl.create(FinishPage, { hours: this.hours });
        modal.present();
    };
    Page1.prototype.verifySaleFeedback = function () {
        var _this = this;
        this._user.getSaleFeedBack()
            .then(function (sale) {
            console.log('salefeedocabk->', sale);
            if (sale) {
                var feedbackModal = _this.modalCtrl.create(FeedbackPage, { sale: sale });
                feedbackModal.present();
            }
        })
            .catch(function (e) {
        });
    };
    Page1.prototype.verifyFirstTime = function () {
        var _this = this;
        this._device.firstTimeApp()
            .then(function (res) {
            if (res) {
                var firstTimeModal = _this.modalCtrl.create(ModalTourPage, { charNum: 0 });
                firstTimeModal.present();
                firstTimeModal.onDidDismiss(function (a) {
                    _this.verifyPush();
                });
            }
            else {
                _this.verifyPush();
            }
        }).catch(function (err) {
            console.log('err->', err);
        });
    };
    Page1.prototype.verifyPush = function () {
        var _this = this;
        this._device.getFcmToken()
            .then(function (tk) {
            if (tk) {
                _this.getProducts();
            }
            else {
                if (_this.platform.is('ios')) {
                    var notificationModal = _this.modalCtrl.create(ModalNotificationPage, { charNum: 0 });
                    notificationModal.present();
                    notificationModal.onDidDismiss(function (a) {
                        _this.verifyFirstTime();
                    });
                }
                else {
                    _this._device.getPushToken()
                        .then(function (token) {
                        _this.verifyFirstTime();
                    });
                }
            }
        });
    };
    Page1.prototype.getProducts = function () {
        var _this = this;
        this.loader.present();
        this._device.createDevice()
            .then(function (res) {
            _this._user.getProducts()
                .then(function (_products) {
                if (_products['zone'] != null) {
                    var closedtime = JSON.parse(_products["schedule"]);
                    _this.hours = closedtime;
                    var d = new Date();
                    if (d.getHours() > closedtime[d.getDay()].start && d.getHours() < closedtime[d.getDay()].end) {
                        _this.closed = true;
                    }
                    _this.products = _products['products'];
                    _this.startTime = new Date().getMilliseconds();
                }
                else {
                    _this.products = [];
                }
                var d = new Date();
                _this.loader.dismiss();
                _this.loadedcompleted = true;
            })
                .catch(function (e) {
                _this.loader.dismiss();
                _this.doConfirm();
            });
        })
            .catch(function (e) {
            _this.loader.dismiss();
            _this.doConfirm();
        });
    };
    Page1.prototype.doConfirm = function () {
        var _this = this;
        var confirm = this.alertCtrl.create({
            title: 'Ops!',
            message: 'Parece que tivemos um erro com o GPS ou a conexão com a internet!',
            buttons: [
                {
                    text: 'Cancelar',
                    handler: function () {
                        _this.loader.dismiss();
                    }
                },
                {
                    text: 'Tentar novamente',
                    handler: function () {
                        _this.getProducts();
                    }
                }
            ]
        });
        confirm.present();
    };
    Page1.prototype.selectBeer = function (beer) {
        var modal = this.modalCtrl.create(ModalContentPage, { 'beer': beer });
        modal.present();
        this.verifySaleFeedback();
    };
    return Page1;
}());
Page1 = __decorate([
    Component({
        selector: 'page-page1',
        templateUrl: 'page1.html'
    }),
    __metadata("design:paramtypes", [ModalController,
        Device,
        User,
        LoadingController,
        Sale,
        AlertController,
        Platform,
        App,
        Events])
], Page1);
export { Page1 };
//# sourceMappingURL=page1.js.map