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
import { NavController, Events } from 'ionic-angular';
import { Page1 } from '../page1/page1';
import { User } from '../../providers/user';
//declare var Appsee:any;
/*
  Generated class for the Finish page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
  */
var FinishPage = (function () {
    function FinishPage(navCtrl, _user, events) {
        var _this = this;
        this.navCtrl = navCtrl;
        this._user = _user;
        this.events = events;
        this.events.subscribe('push:order_update', function (data) {
            _this.verifyLastSale();
        });
        //Appsee.startScreen('finish');
        // an.trackView('Finish','none');
    }
    FinishPage.prototype.ionViewDidLoad = function () {
        this.verifyLastSale();
    };
    FinishPage.prototype.verifyLastSale = function () {
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
    FinishPage.prototype.gotopage1 = function () {
        this.navCtrl.push(Page1);
    };
    return FinishPage;
}());
FinishPage = __decorate([
    Component({
        selector: 'page-finish',
        templateUrl: 'finish.html'
    }),
    __metadata("design:paramtypes", [NavController,
        User,
        Events])
], FinishPage);
export { FinishPage };
//# sourceMappingURL=finish.js.map