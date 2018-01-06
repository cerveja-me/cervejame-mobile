import { Component, ViewChild, NgZone } from '@angular/core';
import { NavController, ModalController, Slides, LoadingController, Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { LOCALE_ID } from '@angular/core';
// import { Firebase } from '@ionic-native/firebase';
import { Deeplinks } from '@ionic-native/deeplinks';


//providers
import { DeviceProvider } from '../../providers/device/device'
import { LocationProvider } from '../../providers/location/location';
import { OrderProvider } from '../../providers/order/order';

//relatedPages
import { MapPage } from '../map/map';
import { ModalVoucherPage } from '../modal-voucher/modal-voucher';
import { ModalSchedulePage } from '../modal-schedule/modal-schedule';
import { ModalLoginPage } from '../modal-login/modal-login';
import { ModalNotificationPage } from '../modal-notification/modal-notification';
import { StatusPage } from '../status/status';
import { FeedbackPage } from '../feedback/feedback';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  products = [];
  location = {};
  @ViewChild(Slides) slides: Slides;
  taped = false;
  changingSlide = false;
  amount = 2;
  selectedBeer: any;
  ASSETS: string = this.order.c.REMOTE_ASSETS;
  showTip = false;
  current = 0;
  loadedcompleted;
  err;
  discount = 0;
  updatingAmount;
  loader;
  actions: any = {
    accepted: null,
    onWay: null,
    finishedAt: null,
    review: null
  }
  openSale: any;
  constructor(
    private modalCtrl: ModalController,
    public navCtrl: NavController,
    private zone: NgZone,
    private storage: Storage,
    private device: DeviceProvider,
    private order: OrderProvider,
    private load: LoadingController,
    private events: Events,
    private deep: Deeplinks
    // private firebase:Firebase
  ) {
    this.loader = this.load.create({
      content: this.device.getRandonLoading()
    })
    this.verifyPush();
    this.verifyOpenSale();
    this.events.subscribe('push:order_update', data => {
      console.log('abriu o evento buscar');
      this.verifyOpenSale();
    });
  }


  ionViewDidLoad() {
    this.device.camPage("home");
    this.loader.present();
    this.order.getZone()
      .then((l) => {
        // this.firebase.logEvent('page_enter', l);
        this.location = l
        this.products = l['zone']['products'];
        this.slideChanged();
        this.loadedcompleted = true;
        // this.verifyTime();
        setTimeout(function () {
          console.log('buscar produtos ');
        }, 2000);

        this.loader.dismiss();
        this.device.registerEvent('entered_zone', { zone_name: l['zone']['name'] });
        this.device.oneSignalTag('zone',l['zone']['name']);
        
      })
      .catch(e => {
        // this.firebase.logError(e);
        this.err = e;
        this.loadedcompleted = true;
        this.loader.dismiss();            //estar sem conexão com a internet
        this.device.registerEvent(this.err, {});

      })
    this.deep.routeWithNavController(this.navCtrl, {
      '/cupom/:voucher': ModalVoucherPage,
      '/feedback': FeedbackPage
    }).subscribe((match) => {
      console.log('Successfully matched route', match);
    }, (nomatch) => {
      // nomatch.$link - the full link data
      console.error('Got a deeplink that didn\'t match', nomatch);
    })
  }

  slideChanged() {
    let current = this.slides.getActiveIndex();
    if (this.products.length === current) {
      this.slides.slidePrev();
    } else {
      this.current = current;
      this.changingSlide = false;
      this.amount = 2;
      this.discount = 0.05;
      this.zone.run(() => { });
      this.device.registerEvent('slide_change', this.products[current]);
      this.selectedBeer = {
        beer: this.products[current],
        discount: this.discount,
        amount: this.amount
      }
      this.updatePriceAndDiscount();
    }
  }

  increaseAmount() {
    this.updatingAmount = true;
    // this.device.registerEvent('increaseAmount',this.selectedBeer.beer)
    this.amount++;
    this.device.registerEvent('increase_amount', this.selectedBeer.beer)
    this.updatePriceAndDiscount();
    setTimeout(() => {
      this.updatingAmount = false;
    }, 100);
  }

  decreaseAmount() {
    this.updatingAmount = true;
    this.device.registerEvent('decrease_amount', this.selectedBeer.beer)

    if (this.amount > 1) {
      this.amount--;
      this.updatePriceAndDiscount();
    }
    setTimeout(() => {
      this.updatingAmount = false;
    }, 100);
  }

  getTipStatus() {
    this.storage.get('hasSeenTip')
      .then((hasSeenTip) => {
        if (!hasSeenTip) {
          this.showTip = true;
          this.storage.set('hasSeenTip', true);
        }
      })
  }

  updatePriceAndDiscount() {
    if (this.selectedBeer.beer.progressive_discount) {
      if (this.amount > 2) {
        this.discount = 0.1;
      } else {
        this.discount = (this.amount - 1) * 0.05;
      }

      this.selectedBeer.discount = this.discount;
      this.selectedBeer.amount = this.amount;
      let p = this.selectedBeer.beer.price * this.amount;
      let full = p;
      p = p - (p * this.discount);
      p = Math.round(p);
      this.selectedBeer.discount = 1 - (p / full);
      this.selectedBeer.finalDiscount = this.selectedBeer.discount * 100;
      this.selectedBeer.price = p;
      this.selectedBeer.unitValue = p / (this.selectedBeer.beer.amount * this.amount);
    } else {
      let p = this.selectedBeer.beer.price * this.amount;
      this.selectedBeer.discount = 0;
      this.selectedBeer.finalDiscount = 0;
      this.selectedBeer.price = p;
      this.selectedBeer.unitValue = p / (this.selectedBeer.beer.amount * this.amount);

    }
    this.zone.run(() => { });
  }
  onTaped(event) {
    this.taped = true;
    this.changingSlide = true;
  }

  verifyPush() {
    this.storage.get('hasOpenNotification')
      .then((hasOpen) => {
        if (hasOpen) {
          this.device.startPush();
        } else {
          let notificationModal = this.modalCtrl.create(ModalNotificationPage);
          notificationModal.present().then(r => {
            this.device.camPage("home");
            this.storage.set('hasOpenNotification', 'true');
          });
        }
      })
  }
  verifyOpenSale() {
    this.order.getOrders()
      .then(s => {

        this.openSale = s[0];
        if (this.openSale) {
          let sale = s[0];
          if (sale.actions) {
            for (let i = 0; i < sale.actions.length; i++) {
              switch (sale.actions[i].action) {
                case 1:
                  this.actions.accepted = sale.actions[i];
                  this.zone.run(() => { });
                  break;
                case 2:
                  this.actions.onWay = sale.actions[i];
                  this.zone.run(() => { });
                  break;
                case 3:
                  this.actions.finishedAt = sale.actions[i];
                  this.zone.run(() => { });
                  break;
                case 4:
                  this.actions.review = sale.actions[i];
                  this.zone.run(() => { });
                  break;
              }
            }
          }
        }
      })
      .catch(e => {
        this.device.logError(e);
        console.log('ee->', e);
      })
  }

  selectProduct(p) {
    this.order.setProduct(p, this.amount);
    this.device.registerEvent('select_beer', this.selectedBeer.beer)
    this.navCtrl.push(MapPage);

  }

  openModalVoucher() {
    this.device.registerEvent('open_voucher', {});
    let voucherModal = this.modalCtrl.create(ModalVoucherPage);//,{}, {});
    voucherModal.present().then(r => {
      this.device.camPage("home");
    })
  }

  openSchedule() {
    this.device.registerEvent('open_schedule', {});
    let scheduleModal = this.modalCtrl.create(ModalSchedulePage, { hours: this['location']['zone']['schedule'] })
    scheduleModal.present().then(r => {
      this.device.camPage("home");
    })
  }

  // openLogin(){
  //   let loginModal = this.modalCtrl.create(ModalLoginPage)
  //   loginModal.present();
  // }
  tryAgain() {
    this.navCtrl.setRoot(HomePage);
    this.device.registerEvent('try_again', {})
  }
  openStatus() {
    if (this.actions.review) {
      this.openFeedback();
    } else {
      this.navCtrl.push(StatusPage);
    }
    this.device.registerEvent('open_status', {});
  }
  openFeedback() {
    this.device.registerEvent('open_feedback', {});
    this.navCtrl.push(FeedbackPage, { sale: this.openSale });
  }

}
