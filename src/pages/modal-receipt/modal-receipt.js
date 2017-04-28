var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, NgZone } from '@angular/core';
import { LoginPage } from '../login/login';
import { MapPage } from '../map/map';
import { Sale } from '../../providers/sale';
import { User } from '../../providers/user';
import { Analytics } from '../../providers/analytics';
import { NavController, Platform, NavParams, ViewController } from 'ionic-angular';
//declare var Appsee:any;
var ModalContentPage = (function () {
    function ModalContentPage(platform, params, viewCtrl, navCtrl, _sale, zone, _user, an) {
        //Appsee.startScreen('modal_receip');
        // an.trackView('modal_receip','none');
        this.platform = platform;
        this.params = params;
        this.viewCtrl = viewCtrl;
        this.navCtrl = navCtrl;
        this._sale = _sale;
        this.zone = zone;
        this._user = _user;
        this.an = an;
        this.beer = this.params.get('beer');
        this.beer.amount = 1;
        this.zone.run(function () { });
        this.timeStart = new Date().getMilliseconds();
        // let time =new Date().getMilliseconds()-this.startTime;
        // this.an.time('TimeToChooseBeer',time,'','');
        // this.an.button('selected_beer',beer.zone,beer.product.name,beer.price);
    }
    ModalContentPage.prototype.dismiss = function () {
        this.an.button('select_canceled', this.beer.zone, this.beer.product.name, this.beer.price);
        this.viewCtrl.dismiss();
    };
    ModalContentPage.prototype.finishRequest = function () {
        var _this = this;
        var time = new Date().getMilliseconds() - this.timeStart;
        this.an.time('TimeToChooseQuantity', time, '', '');
        this._sale.setProduct(this.beer);
        this._user.isUserLogged()
            .then(function (res) {
            if (res) {
                _this.navCtrl.push(MapPage);
            }
            else {
                _this.navCtrl.push(LoginPage);
            }
        });
    };
    ModalContentPage.prototype.increaseAmount = function () {
        this.an.button('increase_quantity_modal', this.beer.zone, this.beer.product.name, this.beer.price);
        this.beer.amount++;
        this.zone.run(function () { });
    };
    ModalContentPage.prototype.decreaseAmount = function () {
        this.an.button('decrease_quantity_modal', this.beer.zone, this.beer.product.name, this.beer.price);
        if (this.beer.amount > 1) {
            this.beer.amount--;
            this.zone.run(function () { });
        }
    };
    return ModalContentPage;
}());
ModalContentPage = __decorate([
    Component({
        templateUrl: 'modal-receipt.html'
    }),
    __metadata("design:paramtypes", [Platform,
        NavParams,
        ViewController,
        NavController,
        Sale,
        NgZone,
        User,
        Analytics])
], ModalContentPage);
export { ModalContentPage };
//# sourceMappingURL=modal-receipt.js.map