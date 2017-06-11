import { Component,NgZone } from '@angular/core';
import { NavController, NavParams,ModalController,ViewController, } from 'ionic-angular';

//pages
import { MapPage } from '../map/map';

//providers
import { DeviceProvider } from '../../providers/device/device';
import { OrderProvider } from '../../providers/order/order';
import { VoucherProvider } from  '../../providers/voucher/voucher';
import { VoucherModalPage } from '../voucher-modal/voucher-modal';

@Component({
    selector: 'page-home-confirm-modal',
    templateUrl: 'home-confirm-modal.html',
})
export class HomeConfirmModalPage {
    coupom;
    character;
    beer;
    timeStart;
    closing=false;
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public device:DeviceProvider,
        public order:OrderProvider,
        public voucher:VoucherProvider,
        public modalCtrl: ModalController,
        private zone:NgZone,
        public viewCtrl: ViewController
        ) {
        this.coupom=this.voucher.getSavedVoucher();
        this.beer=this.navParams.get('beer');
        this.beer.amount=1;
        this.zone.run(()=>{});
    }

    ionViewDidLoad() {
        this.device.camPage("home-modal-confirm");
        this.closing=false;
    }
    dismiss() {
        this.closing=true;
        setTimeout(() => {
            this.viewCtrl.dismiss();
        },300);

    }
    increaseAmount(){
        this.beer.amount++;
        this.zone.run(()=>{});
    }
    decreaseAmount(){
        if(this.beer.amount>1){
            this.beer.amount--;
            this.zone.run(()=>{});
        }
    }
    finishRequest(){
        this.order.setProduct(this.beer);
        this.navCtrl.push(MapPage);
    }

    openVoucherModal(){
        let voucherModal = this.modalCtrl.create(VoucherModalPage);
        voucherModal.present();
        voucherModal.onDidDismiss(date=>{
            this.coupom=this.voucher.getSavedVoucher();
            this.device.camPage("home-modal-confirm");
        });
    }

}
