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
import { LoginPage } from '../login/login';
import { NavController, Platform, NavParams, ViewController } from 'ionic-angular';
export var ModalContentPage = (function () {
    function ModalContentPage(platform, params, viewCtrl, navCtrl) {
        this.platform = platform;
        this.params = params;
        this.viewCtrl = viewCtrl;
        this.navCtrl = navCtrl;
    }
    ModalContentPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    ModalContentPage.prototype.gotomap = function () {
        this.navCtrl.push(LoginPage);
        console.log('aqui vai pro mapa');
    };
    ModalContentPage = __decorate([
        Component({
            templateUrl: 'modal-receipt.html'
        }), 
        __metadata('design:paramtypes', [Platform, NavParams, ViewController, NavController])
    ], ModalContentPage);
    return ModalContentPage;
}());
//# sourceMappingURL=modal-receipt.js.map