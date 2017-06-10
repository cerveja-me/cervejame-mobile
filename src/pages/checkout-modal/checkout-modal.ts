import { Component } from '@angular/core';
import { NavController, NavParams,ViewController,ModalController,AlertController,Events } from 'ionic-angular';

import { GeolocationProvider } from '../../providers/geolocation/geolocation';
import { DeviceProvider } from '../../providers/device/device';
import { OrderProvider } from '../../providers/order/order';
import { UserProvider } from '../../providers/user/user';

import { LoginModalPage } from '../login-modal/login-modal';
import { RegisterModalPage } from '../register-modal/register-modal';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-checkout-modal',
  templateUrl: 'checkout-modal.html',
})
export class CheckoutModalPage {
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
    public userp:UserProvider
    )
  {

  }

  ionViewDidLoad() {
    this.device.camPage('checkout');
    this.product=this.order.getProduct();
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
    this.userp.isUserLogged()
    .then(userLogged=>{
      if(userLogged){
        this.userp.getLoggedUser()
        .then(u=>{
          this.user=u;
          this.doPrompt()
          .then((data)=>{
            if(data){
              if(data['phone']!=null){
                this.user.costumer.phone = data['phone'];
                this.userp.updateUser(this.user.costumer)
                .then((un)=>{
                  this.userp.getLoggedUser()
                  .then(uu =>{
                    uu['costumer']=un;
                    this.user=uu;
                    this.userp.setLoggedUser(this.user);
                    this.device.oneSignalTag('sale','true');
                    this.completeSale();
                  })
                })
              }else{
                this.finishOrder();
              }
            }
          })
        })
      }else{
        this.login();
      }
    })
  }
  login(){
    let modal = this.modalCtrl.create(LoginModalPage);
    modal.present();
    modal.onDidDismiss(data => {
      if(data==='success'){
        this.finishOrder();
      }else{
        this.device.camPage('login');
      }
    });
  }

  completeSale(){
    let p=this.order.getProduct();

    let csa=this.user['costumer'];
    this.order.createSale({
      address:this.geoloc.formatAddress(this.fullAddress) +(this.addressComplement?", complemento: "+this.addressComplement:''),
      location:this.order.getLocation().id,
      device:this.device.getDevice,
      costumer:csa['id'],
      payment:this.payment,
      product:{
        amount:p["amount"],
        id:p['id']
      }
    })
    .then(r =>{
      this.navCtrl.push(HomePage)
      .then(() => {
        const startIndex = this.navCtrl.getActive().index - 1;
        this.navCtrl.remove(startIndex, 1);
      });
    })
    .catch(e =>{
      let alert = this.alertCtrl.create({
        title: 'Erro',
        message: 'Opa! Tivemos um erro, por favor tente novamente, se o erro persistir entre contato <a href="http://cerveja.me">Cerveja.me</a>.',
        buttons: ['Ok']
      });
      alert.present();
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
            console.log('Cancel clicked', data);
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
