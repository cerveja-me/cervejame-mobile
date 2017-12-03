import { Component,NgZone } from '@angular/core';
import { NavController,ModalController,ViewController,AlertController } from 'ionic-angular';

//providers
import { OrderProvider } from '../../providers/order/order';
import { UserProvider } from '../../providers/user/user';
//relatedPages
import { ModalVoucherPage } from '../modal-voucher/modal-voucher';
import { ModalLoginPage } from '../modal-login/modal-login';
import { HomePage } from '../home/home';
import { StatusPage } from '../status/status';
import { CardPage } from '../card/card';



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
    private zone:NgZone,
    private user:UserProvider
  ) {
  }

  ionViewDidLoad() {
    this.order.device.camPage("checkout");
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
    this.user.isAuth()
    .then(()=>{
      this.doPrompt()
      .then(data =>{
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
      })
      .catch(m=>{
        let alert = this.alertCtrl.create({
          title: 'Telefone',
          message: m,
          buttons: ['Ok']
        });
        alert.onDidDismiss(()=>{
          this.finishOrder();
        })
        alert.present();
      })
    })
    .catch(e=>{
      this.openLogin();
    })
  }

  openCard(){
    this.user.isAuth()
    .then(u=>{
      let cardModal = this.modalCtrl.create(CardPage);
      cardModal.present();
    })
    .catch(()=>{
      let loginModal = this.modalCtrl.create(ModalLoginPage)
      loginModal.onDidDismiss((data)=>{
        if(data==='success'){
          this.openCard();
        }
      })
      loginModal.present();
    })
  }

  openLogin(){
    return new Promise((resolve, reject)=> {
      let loginModal = this.modalCtrl.create(ModalLoginPage)
      loginModal.onDidDismiss((data)=>{
        if(data==='success'){
          this.finishOrder();
        }
      })
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

doPrompt() {
  return new Promise((resolve, reject) => {
    let prompt = this.alertCtrl.create({
      title: 'Complemento',
      message: "Para melhorar sua entrega, passa aí seu compĺemento e telefone.",
      inputs: [
        {
          name: 'complement',
          placeholder: 'Complemento do endereço',
          value:this.or['location']['complement']
        },
        {
          name: 'phone',
          placeholder: 'Seu Telefone',
          type:'tel'
        }
      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Continuar',
          handler: data => {
            if(data.phone){
              this.user.costumerUpdate(data.phone)
              .then(resolve)
            }else{
              reject("o preenchimento do telefone é obrigatorio");
            }
          }
        }
      ]
    });
    prompt.present();
  });
}
}
