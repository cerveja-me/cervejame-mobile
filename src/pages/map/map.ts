import { Component, ViewChild, ElementRef, NgZone } from '@angular/core';
import { Keyboard } from '@ionic-native/keyboard';
import { NavController, NavParams, Platform, ModalController } from 'ionic-angular';

declare var google;

//providers
import { OrderProvider } from '../../providers/order/order';
import { LocationProvider } from '../../providers/location/location';
import { DeviceProvider } from '../../providers/device/device';
//pages
import { CheckoutPage } from '../checkout/checkout';

@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  @ViewChild('map') mapElement: ElementRef;

  map: any;
  address;
  fulladdress;
  addressOptions = [];
  complement = '';
  number = '';
  loader;
  texting: boolean = false;
  oldLoc: any = {};
  originalMapCenter: any = {};
  movingPin = false;
  closing;
  editingAddress;
  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private zone: NgZone,
    private platform: Platform,
    private modalCtrl: ModalController,
    private order: OrderProvider,
    private location: LocationProvider,
    private device: DeviceProvider,
    private keyboard: Keyboard
  ) {
    keyboard.onKeyboardShow().subscribe(data => {
      this.texting = true;
    })
    keyboard.onKeyboardHide().subscribe(data => {
      this.texting = false;
    })
  }

  ionViewDidLoad() {
    this.order.device.camPage("map");
    this.loadMap();
  }

  loadMap() {
    // this.loader=this.load.create({
    //     content: this.device.getRandonLoading()
    // });
    // this.loader.present();
    this.location.getMap()
      .then((mapOpt) => {
        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOpt);

        this.updateAddress({ 0: this.map.getCenter().lat(), 1: this.map.getCenter().lng() });
        // this.loader.dismiss();

        this.map.addListener('dragstart', () => {
          this.movingPin = true;
          this.zone.run(() => { });
        }, err => {
          console.log(err);
        });
        this.map.addListener('dragend', () => {
          this.movingPin = false;
          this.updateAddress({ 0: this.map.getCenter().lat(), 1: this.map.getCenter().lng() });
          this.device.registerEvent('moved_pin',{});
        }, err => {
          console.log(err);
        });

        var centerControlDiv = document.createElement('div');
        // this.location.getPosition()
        // .then(p=>{
        //   var centerControl = new this.centerControl(centerControlDiv, this.map,p);
        //   this.map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(centerControlDiv);
        // })
        // .catch(e=>{
        //   console.log('oi',e);
        // })

      })
      .catch(e => {
        console.log('err', e)
        // this.loader.dismiss();
      });

  }

  centerControl(controlDiv, map, geo) {

    // Set CSS for the control border.
    var controlUI = document.createElement('div');
    controlUI.style.backgroundColor = 'none';
    //  controlUI.style.border = '2px solid #fff';
    //  controlUI.style.borderRadius = '3px';
    //  controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
    controlUI.style.cursor = 'pointer';
    //  controlUI.style.marginBottom = '20px';
    controlUI.style.textAlign = 'center';
    controlUI.title = 'Click to recenter the map';
    controlDiv.appendChild(controlUI);

    // Set CSS for the control interior.
    var controlText = document.createElement('div');
    controlText.style.color = '';
    controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
    controlText.style.fontSize = '';
    controlText.style.lineHeight = '';
    controlText.style.paddingLeft = '';
    controlText.style.paddingRight = '';
    controlText.innerHTML = '<span class="icon-location"></span>';
    controlUI.appendChild(controlText);

    controlUI.addEventListener('click', function () {
      map.setCenter({ lat: geo.latitude, lng: geo.longitude });
      google.maps.event.trigger(map, 'dragend');
    });

  }
  registerChanges(ev){
    this.device.registerEvent(ev,{});
  }

  updateAddress(_loc) {
    this.location.getAddressFromLocation(_loc)
      .then((address) => {
        this.address = address;
        this.fulladdress = this.address['route'];
        this.number = this.address['street_number'];
        if (this.number && this.number.includes('-')) {
          this.number = null;
        }
        this.zone.run(() => { });
        this.order.updateLocationAddress(_loc, this.fulladdress, this.number, this.complement);
      });
  }

  addressChange() {
    if (this.address.formated.length > 3) {
      this.location.getLocationsWithAddres(this.fulladdress, this.map.getCenter())
        .then((listAddress) => {
          this.addressOptions = listAddress['results'];
        })
        .catch(e => {
          console.log('err', e)
          // this.loader.dismiss();
        });
    }
  }

  setAddress(address) {
    let add = this.location.convertAddress(address);
    this.address.route = add['route'];
    this.fulladdress = add['route'];
    this.number = add['street_number'];
    this.closeEdit();

    setTimeout(() => {
      this.map.setCenter(new google.maps.LatLng(address.geometry.location.lat, address.geometry.location.lng));
      this.fulladdress = add['route'];
    }, 500);
    this.addressOptions = [];

  }

  closeEdit() {
    this.fulladdress = this.address['route'];
    if (this.platform.is('cordova')) {
      let activeElement = <HTMLElement>document.activeElement;
      activeElement && activeElement.blur && activeElement.blur();
    }
    this.editingAddress = false;
  }

  finishOrder() {
    // if()
    this.order.updateLocationAddress({ 0: this.map.getCenter().lat(), 1: this.map.getCenter().lng() }, this.fulladdress, this.number, this.complement);
    this.closeEdit();
    //let loca={0:this.map.getCenter().lat(),1:this.map.getCenter().lng()}
    this.address.street_number = this.number;
    this.navCtrl.push(CheckoutPage);
    this.device.registerEvent('confirm_address',{});    
  }

}
