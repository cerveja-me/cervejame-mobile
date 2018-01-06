import { Component,NgZone } from '@angular/core';
import { NavController,ModalController,ViewController,AlertController } from 'ionic-angular';

//providers
import { OrderProvider } from '../../providers/order/order';
import { UserProvider } from '../../providers/user/user';
import { DeviceProvider } from '../../providers/device/device';
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
    private zone:NgZone,
    private user:UserProvider,
    private device: DeviceProvider
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
    this.device.oneSignalTag('order','checkout');
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
    modal.present().then(r=>{
      this.device.camPage("checkout");        
    })
  }
  converttofirebase(or){
    let p = or['product']['product']['price'];
    let am = or['product']['product']['amount'];
    let sh=or['location']['zone']['free_shipping'];
    let fv=or['location']['zone']['freight_value'];
    let v = sh?p*am:(p+fv);
    let d = or['product']['product']['finalDiscount'];
    let a = {
      zone:or['location']['zone']['name'],
      freight_value:fv,
      free_shipping:sh,
      product:or['product']['product']['beer']['name']+'-'+this.or['product']['product']['beer']['description'],
      price:p,
      discount:d,
      amount:am,
      payment_value:v//or['location']['zone']['free_shipping']?this.or['product']['product']['beer']['price']:this.or['product']['product']['beer']['price']+this.or['location']['zone']['freight_value']
    };
    console.log(a);
    return a;
  }

  finishOrder(){
    this.device.registerEvent('finish_order', this.converttofirebase(this.or));        
    this.user.isAuth()
    .then(()=>{
      this.user.getCostumerData()
      .then( c =>{
        this.device.registerEvent('open_phone',this.converttofirebase(this.or));                
        this.doPrompt(c['phone'])
        .then(data =>{
          this.order.completeOrder(this.payment)
          .then(res=>{            
            this.device.registerEvent('order_completed', this.converttofirebase(this.or));
            this.navCtrl.setRoot(StatusPage);
            this.user.updateCostumerData();
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
                title:'Cupom já utilizado ou inválido',
                message: 'Este cupom é válido para ser usado apenas uma vez ou está fora do período promocional.',
                buttons: ['Ok']
              });
              alert.present();
              this.order.removeVoucher();
              this.getVoucher();
              this.device.registerEvent('voucher_removed', this.or);                      
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
    })
    .catch(e=>{
      this.openLogin();
    })

  }

  openLogin(){
    return new Promise((resolve, reject)=> {
      let loginModal = this.modalCtrl.create(ModalLoginPage)
      loginModal.onDidDismiss((data)=>{
      this.device.camPage("checkout");                
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

doPrompt(phone) {
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
          type:'tel',
          value:phone
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            this.device.registerEvent('order_canceled', this.or);            
          }
        },
        {
          text: 'Continuar',
          handler: data => {
            if(data.phone){
              this.user.costumerUpdate(data.phone)
              .then(resolve)
            }else{
              reject("Precisamos do seu telefone para que sua experiência de atendimento seja muito melhor. ");
            }
          }
        }
      ]
    });
    prompt.present();
  });
}
}
