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
import { NavController, ModalController, AlertController, LoadingController } from 'ionic-angular';
import { MapPage } from '../map/map';
import { ModalRegisterPage } from '../modal-register/modal-register';
import { Facebook } from 'ionic-native';
import { Analytics } from '../../providers/analytics';
import { User } from '../../providers/user';
import { Device } from '../../providers/device';
//declare var Appsee:any;
/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
  */
var LoginPage = (function () {
    function LoginPage(navCtrl, modalCtrl, _user, _loading, _device, alerCtrl, an) {
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this._user = _user;
        this._loading = _loading;
        this._device = _device;
        this.alerCtrl = alerCtrl;
        this.an = an;
        this.login = {
            email: '',
            password: ''
        };
        this.loader = this._loading.create({
            content: this._device.getRandonLoading()
        });
        //Appsee.startScreen('login');
        // an.trackView('Login','none');
    }
    LoginPage.prototype.ionViewDidLoad = function () {
        console.log('Hello LoginPage Page');
    };
    LoginPage.prototype.gotomap = function () {
        this.navCtrl.push(MapPage);
    };
    LoginPage.prototype.doFbLogin = function () {
        return new Promise(function (resolve, reject) {
            var permissions = new Array();
            //the permissions your facebook app needs from the user
            permissions = ["public_profile", "email"];
            Facebook.login(permissions)
                .then(function (response) {
                var userId = response.authResponse.userID;
                var params = new Array();
                //Getting name and gender properties
                Facebook.api("/me?fields=name,gender,email", params)
                    .then(function (user) {
                    user.picture = "https://graph.facebook.com/" + userId + "/picture?type=large";
                    user.auth = response.authResponse;
                    console.log('user->', user);
                    resolve(user);
                });
            }, function (error) {
                console.log('erro->', error);
                reject(error);
            });
        });
    };
    LoginPage.prototype.doLoginForm = function () {
        var _this = this;
        this.loader.present();
        this._user.loginUser(this.login)
            .then(function (u) {
            _this.loader.dismiss();
            if (u['err'] == null) {
                _this._user.setLoggedUser(u);
            }
            else {
                var alert_1 = _this.alerCtrl.create({
                    title: 'Dados Invalidos',
                    message: 'Parece que você errou sua senha, cuidado quando for utilizar o aplicativo enquanto estiver alcoolizado.',
                    buttons: ['Ok']
                });
                alert_1.present();
            }
        });
    };
    LoginPage.prototype.facebookRegister = function () {
        var _this = this;
        this.doFbLogin()
            .then(function (user) {
            _this._user.facebookRegister(user)
                .then(function (result) {
                _this._user.setLoggedUser(result);
                _this.gotomap();
            });
        });
    };
    LoginPage.prototype.openModalRegister = function () {
        var _this = this;
        var modal = this.modalCtrl.create(ModalRegisterPage);
        modal.present();
        modal.onWillDismiss(function (f) {
            if (f != null) {
                _this.gotomap();
            }
            else {
                _this._user.isUserLogged()
                    .then(function (log) {
                    if (log) {
                        _this.gotomap();
                    }
                });
            }
        });
    };
    return LoginPage;
}());
LoginPage = __decorate([
    Component({
        selector: 'page-login',
        templateUrl: 'login.html'
    }),
    __metadata("design:paramtypes", [NavController,
        ModalController,
        User,
        LoadingController,
        Device,
        AlertController,
        Analytics])
], LoginPage);
export { LoginPage };
//# sourceMappingURL=login.js.map