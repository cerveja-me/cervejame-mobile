var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild, ElementRef } from '@angular/core';
import { LoadingController } from 'ionic-angular';
import { ModalMapPage } from '../modal-map/modal-map';
import { ModalAddressPage } from '../modal-address/modal-address';
import { NavController, ModalController } from 'ionic-angular';
import { NgZone } from '@angular/core';
import { Device } from '../../providers/device';
import { User } from '../../providers/user';
import { Analytics } from '../../providers/analytics';
//declare var Appsee:any;
/*
  Generated class for the Map page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
  */
var MapPage = (function () {
    function MapPage(navCtrl, modalCtrl, _device, zone, _user, _loading, an) {
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this._device = _device;
        this.zone = zone;
        this._user = _user;
        this._loading = _loading;
        this.an = an;
        this.loader = this._loading.create({
            content: this._device.getRandonLoading()
        });
        this.addressOptions = [];
        this.complement = '';
        //Appsee.startScreen('map');
        // an.trackView('map','none');
    }
    MapPage.prototype.ionViewDidLoad = function () {
        this.loader.present();
        this.loadMap();
    };
    MapPage.prototype.loadMap = function () {
        var _this = this;
        this.loader.present();
        this._device.getLocation()
            .then(function (location) {
            var latLng = new google.maps.LatLng(location[0], location[1]);
            _this._device.getAddressFromLocation(location)
                .then(function (address) {
                _this.setAddressNew(address);
                _this.fullAddress = _this._device.convertAddress(address);
                var endereco = address['formatted_address'];
                _this._user.getNewLocation(location, endereco)
                    .then(function (r) {
                    _this.loader.dismiss();
                });
            });
            var mapOptions = {
                center: latLng,
                clickableIcons: false,
                disableDoubleClickZoom: true,
                fullscreenControl: false,
                panControl: false,
                rotateControl: false,
                scaleControl: false,
                scrollwheel: false,
                signInControl: false,
                streetViewControl: false,
                zoomControl: false,
                mapTypeControl: false,
                zoom: 17,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            _this.map = new google.maps.Map(_this.mapElement.nativeElement, mapOptions);
            _this.map.addListener('center_changed', function () {
                var _loc = { 0: _this.map.getCenter().lat(), 1: _this.map.getCenter().lng() };
                _this._device.getAddressFromLocation(_loc)
                    .then(function (address) {
                    _this.setAddressNew(address);
                    //console.log(this._device.formatAddress(this._device.convertAddress(address)));
                    var endereco = _this._device.formatAddress(_this._device.convertAddress(address));
                    _this._user.getNewLocation(_loc, endereco);
                });
            });
            _this.map.addListener('domready', function (e) {
                console.log('mapread');
            });
        });
    };
    MapPage.prototype.setAddressNew = function (address) {
        this.fullAddress = this._device.convertAddress(address);
        this.address = this._device.formatAddress(this.fullAddress);
        this.addressOptions = [];
        this.zone.run(function () { });
    };
    MapPage.prototype.addressChange = function (address) {
        var _this = this;
        if (address.length > 3) {
            this._device.getLocationsWithAddres(address)
                .then(function (listAddress) {
                _this.addressOptions = listAddress['results'];
            });
        }
    };
    MapPage.prototype.setAddress = function (address) {
        this.fullAddress = this._device.convertAddress(address);
        this.address = this._device.formatAddress(this.fullAddress);
        this.addressOptions = [];
        // new google.maps.LatLng(address, location[1]);
        this.map.setCenter(address['geometry'].location);
    };
    MapPage.prototype.clearAddress = function () {
        this.address = '';
        this.zone.run(function () { });
    };
    MapPage.prototype.openModal = function () {
        var loca = { 0: this.map.getCenter().lat(), 1: this.map.getCenter().lng() };
        var modal = this.modalCtrl.create(ModalMapPage, { "location": loca, "address": this.fullAddress, "complement": this.complement });
        modal.present();
    };
    MapPage.prototype.openAddressModal = function () {
        var _this = this;
        var loca = { 0: this.map.getCenter().lat(), 1: this.map.getCenter().lng() };
        var modal = this.modalCtrl.create(ModalAddressPage, { "location": loca, "address": this.fullAddress });
        modal.onDidDismiss(function (data) {
            if (data != null) {
                _this.fullAddress.route = data.address;
                _this.fullAddress.street_number = data.number;
                _this.complement = data.complement;
                _this.address = _this._device.formatAddress(_this.fullAddress);
                _this.zone.run(function () { });
                console.log('data->', data);
            }
        });
        modal.present();
    };
    return MapPage;
}());
__decorate([
    ViewChild('map'),
    __metadata("design:type", ElementRef)
], MapPage.prototype, "mapElement", void 0);
MapPage = __decorate([
    Component({
        selector: 'page-map',
        templateUrl: 'map.html'
    }),
    __metadata("design:paramtypes", [NavController,
        ModalController,
        Device,
        NgZone,
        User,
        LoadingController,
        Analytics])
], MapPage);
export { MapPage };
//# sourceMappingURL=map.js.map