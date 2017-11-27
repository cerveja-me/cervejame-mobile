import { Component,NgZone } from '@angular/core';
import { NavController,ModalController,ViewController,AlertController } from 'ionic-angular';

//providers
import { OrderProvider } from '../../providers/order/order';

//relatedPages
import { ModalVoucherPage } from '../modal-voucher/modal-voucher';
import { ModalLoginPage } from '../modal-login/modal-login';
import { HomePage } from '../home/home';
import { StatusPage } from '../status/status';

@Component({
  selector: 'page-checkout',
  templateUrl: 'checkout.html',
})
export class CheckoutPage {
  or;
  closing;
  payment;
  address='';
  voucher;
  constructor(
    private navCtrl:NavController,
    private modalCtrl:ModalController,
    private viewCtrl: ViewController,
    private order:OrderProvider,
    private alertCtrl:AlertController,
    private zone:NgZone
  ) {
  }

  ionViewDidLoad() {
    this.or=this.order.getOrder();

    this.address = this.or['location']['street']+", "+(this.or['location']['number'] || 's/n');
    if(this.or['location']['complement']){
      this.address+=', comp.: '+this.or['location']['complement']
    }
    this.getVoucher();

  }

  getVoucher(){
    this.voucher = this.order.getVoucher();
    this.zone.run(()=>{});
  }

  close(){
    this.navCtrl.pop();
  }

  openVoucherModal(){
    let modal = this.modalCtrl.create(ModalVoucherPage);
    modal.present();
  }

  finishOrder(){
    this.order.completeOrder(this.payment)
    .then(res=>{
      this.navCtrl.setRoot(StatusPage);
    })
    .catch( e =>{
      if(e.status == 403){
        this.openLogin()
        .then(login=>{
          this.finishOrder();
        })
      }else if(e.code==2000){
        let alert = this.alertCtrl.create({
          title: 'Erro',
          message: e.message,
          buttons: ['Ok']
        });
        alert.present();
      }else{
        let alert = this.alertCtrl.create({
          title: 'Vooucher',
          message: e.error.message,
          buttons: ['Ok']
        });
        alert.present();
        this.order.removeVoucher();
        this.getVoucher();
      }

      console.log('er-> ',e);
    })
  }

  openLogin(){
    return new Promise((resolve, reject)=> {
      let loginModal = this.modalCtrl.create(ModalLoginPage)
      loginModal.present();
    })
  }
  openModalVoucher(){
    let voucherModal = this.modalCtrl.create(ModalVoucherPage);//,{}, {});
    voucherModal.onDidDismiss(()=>{
      this.getVoucher();
    })
    voucherModal.present();
  }

}
