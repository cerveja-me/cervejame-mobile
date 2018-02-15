import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserProvider } from '../user/user';

declare var Mercadopago:any;

@Injectable()
export class PaymentProvider {
  pk="TEST-d7461746-9617-4490-95be-2e36541843ed";
  at="TEST-4713963692464683-080116-7e44bf05719877c61ac5fce5ee74b2a9__LB_LC__-264729305";
  constructor(
    public http: HttpClient,
    private user:UserProvider
  ){
    Mercadopago.setPublishableKey(this.pk);
    this.findOrCreateMPCostumer()
  }
  mpuser:any;

  findOrCreateMPCostumer(){
    this.user.getCostumerData(true)
    .then( d =>{
      this.searchMPUser(d['email'])
      .then(mpuser => {
        console.log(mpuser);
        this.mpuser=mpuser;
      })
      .catch(e =>{
        if(e==="NOT_FOUND"){
          this.createMPUser(d)
          .then(mpuser=>{
            console.log(mpuser);
            this.mpuser=mpuser;
          })
          .catch(e=>{
            console.log(e);
          })
        }else{
          console.log(e);
        }
      })
    })
  }

  // Mercadopago.getInstallments({
  //   "payment_method_id":"visa",
  //   "amount": 100
  // }, function (status, response){
  //   console.log('data->',status,response);
  // });
  // console.log('ionViewDidLoad CardPage',this);
  // console.log('mercado >',mp);

  // getCardToken(){
  //
  //   Mercadopago.getIdentificationTypes((status,tp)=>{
  //     let idTypes=tp;
  //   });
  //   Mercadopago.createToken({
  //     email:"jefersonguardezi@gmail.com",
  //     cardNumber:"4235647728025682",
  //     securityCode:"123",
  //     cardExpirationMonth:"10",
  //     cardExpirationYear:"2020",
  //     cardholderName:"Jeferson Guardezi",
  //     docType:"CPF",
  //     docNumber:"08295024914"
  //   },(res,tk)=>{
  //     console.log('token->',res);
  //   })
  // }

  searchMPUser(email){
    return new Promise((resolve, reject) => {
      let url = this.CUSTOMER+'search?email='+email+'&'+this.TOKEN;
      this.get(url)
      .then(res=>{
        if(res){
          resolve(res[0]);
        }else{
          reject("NOT_FOUND");
        }
      })
      .catch(reject);
    })
  }
  createMPUser(u){
    return new Promise((resolve, reject) => {
      let mpuser={
        email:u.email,
        first_name:u.name.split(' ')[0],
        last_name:u.name.split(' ')[u.name.split(' ').length-1] || '',
        phone:{
          area_code:"",
          number:u.phone || ""
        }
      }
      let url=this.CUSTOMER+"?"+this.TOKEN;
      this.post(url,mpuser)
      .then(user=>{
        resolve(user);
      })
      .catch(reject);
    })
  }

  API_BASE:string = "https://api.mercadopago.com/v1/";
   CUSTOMER:string = "customers/";
   TOKEN:string = "access_token="+this.at;

  post(endpoint, data){
    return new Promise((resolve, reject) => {
      let h=new HttpHeaders()
      .append('Content-Type', 'application/json');
      this.http.post(this.API_BASE+endpoint, JSON.stringify(data),{
        headers: h
      })
      .subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  put(endpoint, data){
    return new Promise((resolve, reject) => {
      let h=new HttpHeaders()
      .append('Content-Type', 'application/json');
      this.http.put(this.API_BASE+endpoint, JSON.stringify(data),{
        headers: h
      })
      .subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  get(endpoint){
    return new Promise((resolve, reject) => {
      this.http.get(this.API_BASE+endpoint)
      .subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }
}
