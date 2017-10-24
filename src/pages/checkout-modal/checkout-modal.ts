import { Component } from '@angular/core';
import { NavController, NavParams,ViewController,ModalController,AlertController,Events } from 'ionic-angular';

import { GeolocationProvider } from '../../providers/geolocation/geolocation';
import { DeviceProvider } from '../../providers/device/device';
import { OrderProvider } from '../../providers/order/order';
import { UserProvider } from '../../providers/user/user';
import { VoucherProvider } from '../../providers/voucher/voucher';


import { LoginModalPage } from '../login-modal/login-modal';
import { HomePage } from '../home/home';
import { VoucherModalPage } from '../voucher-modal/voucher-modal';
import { ScheduleModalPage } from '../schedule-modal/schedule-modal';

@Component({
  selector: 'page-checkout-modal',
  templateUrl: 'checkout-modal.html',
})
export class CheckoutModalPage {
  coupom;
  character;
  user;
  request;
  product;
  address;
  fullAddress;
  payment='card';
  addressComplement='';
  readAddress='';
  closing=false;
  constructor(
    public navCtrl: NavController,
    public params: NavParams,
    public viewCtrl: ViewController,
    public modalCtrl:ModalController,
    public alertCtrl:AlertController,
    public events:Events,
    public order:OrderProvider,
    public device:DeviceProvider,
    public geoloc:GeolocationProvider,
    public userp:UserProvider,
    public voucher:VoucherProvider
    )
  {

  }

  ionViewDidLoad() {
    this.coupom=this.voucher.getSavedVoucher();
    this.device.camPage('checkout');
    this.product=this.order.getProduct();
    this.product.product=this.product.beer.product;
    this.fullAddress=this.params.get("address");
    this.addressComplement=this.params.get("complement");
    this.address=this.geoloc.formatAddress(this.fullAddress) +(this.addressComplement?", "+this.addressComplement:'');
    this.closing=false;
  }

  dismiss(msg) {
    this.viewCtrl.dismiss(msg);
  }

  close(){
    this.closing=true;
    setTimeout(() => {
      this.viewCtrl.dismiss();
    },300);
  }

  finishOrder(){
    if(this.userp.isUserLogged()){
      this.verifyVoucherAfterLogin()
      .then(()=>{
        this.user=this.userp.getUser();
        this.doPrompt()
        .then((data)=>{
          if(data && data['phone']!==null){
            this.user.costumer.phone = data['phone'];
            this.userp.updateUser(this.user.costumer)
            .then((un)=>{
              this.user=un;
              this.device.oneSignalTag('sale','true');
              this.completeSale();
            })
          }
        })
      })
      .catch(er=>{
        let alert = this.alertCtrl.create({
          title: 'OPA!',
          subTitle: 'Você já utilizou este cupom uma vez. Continue a compra sem o cupom.',
          buttons: ['Entendi']
        });
        alert.present();
      })

    }else{
      this.login();
    }
  }

  verifyVoucherAfterLogin(){
    return new Promise((resolve, reject) => {
      let v=this.voucher.getSavedVoucher();
      if(v){
        this.voucher.getVoucher(v.code)
        .then(res=>{
          resolve();
        })
        .catch(er=>{
          this.coupom=null;
          this.voucher.removeVoucher();
          reject();
          // this.error_active=true
          // this.voucher_active=false;
        })
      }else{
        resolve();
      }
      });
  }

  openVoucherModal(){
    let voucherModal = this.modalCtrl.create(VoucherModalPage);
    voucherModal.present();
    voucherModal.onDidDismiss(date=>{
      this.coupom=this.voucher.getSavedVoucher();
      this.device.camPage("home-modal-confirm");
    });
  }

  login(){
    let modal = this.modalCtrl.create(LoginModalPage);
    modal.present();
    modal.onDidDismiss(data => {
      if(data==='success'){
        if(this.coupom){ //verificar se o cupom que é valido com o login
          this.voucher.getVoucher(this.coupom.code)
          .then(voucher=>{
            this.finishOrder();
          }).catch(er=>{
            // apresentar mensagem de erro
            // volta para o checkout para poder adicioonar outro cupom
            this.device.camPage('checkout');
          })
        }else{
          this.finishOrder();
        }
      }else{
        //apresentar erro de login
        this.device.camPage('checkout');
      }
    });
  }

  completeSale(){
    let p=this.order.getProduct();
    let csa=this.user['costumer'];
    let sale={
      address:this.geoloc.formatAddress(this.fullAddress) +(this.addressComplement?", complemento: "+this.addressComplement:''),
      location:this.order.getLocation().id,
      device:this.device.getDevice, //verificar aqui
      costumer:csa['id'],
      payment:this.payment,
      product:{
        price:p.price,
        amount:p["amount"],
        id:p.beer['id']
      },
      discount:null,
      voucher:null
    }
    if(this.coupom && sale.product.amount>=this.coupom.min_amount){
      sale.discount=this.coupom.value;
      sale.voucher=this.coupom.id;
    }

    this.order.createSale(sale)
    .then(r =>{
      this.navCtrl.push(HomePage,{"justFinished":true})
      .then(() => {
        const startIndex = this.navCtrl.getActive().index - 1;
        this.navCtrl.remove(startIndex, 1);
      });
    })
    .catch(e =>{
      //console.log('errorrr->>> ',e);
      let errMsg = (e._body) ? e._body :
   e.status ? `${e.status} - ${e.statusText}` : 'Server error';
      if(errMsg=="TIME_IS_UP"){
        let alert = this.alertCtrl.create({
          title: 'Encerramos por hoje',
          message: 'Infezlimente, não estamos mais fazendo entregas, confira nossos horários de atendimento.',
          buttons: [
            {
              text: 'Horários',
              handler: data => {
                this.order.getZone()
                .then(z=>{
                  //this.device.oneSignalTag('zone',z['zone']);
                  var closedtime = JSON.parse(z["schedule"]);
                  //this.hours =closedtime;
                  var d=new Date();
                  var closed=true;
                  if(d.getHours() > closedtime[d.getDay()].start && d.getHours() < closedtime[d.getDay()].end){
                    closed = true;
                  }
                let modal = this.modalCtrl.create(ScheduleModalPage,{hours:closedtime, closed:closed});
                modal.present();
              });
              }
            },
          {
            text: 'Ok'
          }

          ]
        });
        alert.present();
      }else{
        let alert = this.alertCtrl.create({
          title: 'Erro',
          message: 'Opa! Tivemos um erro, por favor tente novamente, se o erro persistir entre contato <a href="http://cerveja.me">Cerveja.me</a>.',
          buttons: ['Ok']
        });
        alert.present();
      }
    });

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
          value:this.addressComplement
        },
        {
          name: 'phone',
          placeholder: 'Seu Telefone',
          value:this.user.costumer.phone,
          type:'tel'
        }
        ],
        buttons: [
        {
          text: 'Cancel',
          handler: data => {
            resolve(null);
          }
        },
        {
          text: 'Continuar',
          handler: data => {
            this.addressComplement=data.complement;
            resolve(data);
          }
        }
        ]
      });
      prompt.present();
    });
  }



  //ver se tem usuario logado

}
