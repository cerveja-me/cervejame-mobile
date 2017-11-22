import { Component } from '@angular/core';
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
  constructor(
    private navCtrl:NavController,
    private modalCtrl:ModalController,
    private viewCtrl: ViewController,
    private order:OrderProvider,
    private alertCtrl:AlertController
  ) {
    this.or=this.order.getOrder();
    this.address = this.or['location']['street']+", "+(this.or['location']['number'] || 's/n');
    if(this.or['location']['complement']){
      this.address+=', comp.: '+this.or['location']['complement']
    }
  }

  ionViewDidLoad() {
  }

  close(){
    this.closing=true;
    setTimeout(() => {
      this.viewCtrl.dismiss();
    },300);
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
    voucherModal.present();
  }

}
