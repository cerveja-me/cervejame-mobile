import { Injectable } from '@angular/core';

//providers
import { LocationProvider } from '../location/location';
import { NetworkProvider } from '../network/network';
import { DeviceProvider } from '../device/device';
import { ConstantsProvider } from '../constants/constants';
import { UserProvider } from '../user/user';

@Injectable()
export class OrderProvider {
  sale={
    id:'',
    product:{},
    amount:0
  }
  locale;
  voucher;
  constructor(
    private location: LocationProvider,
    private network: NetworkProvider,
    private device: DeviceProvider,
    public c:ConstantsProvider
  ) {
  }

  getZone(){
    return new Promise((resolve, reject)=> {
      this.location.getPosition()
      .then( l=>{
        this.device.getDevice()
        .then( d =>{
          const day = new Date();
          const p={
            id_device: d['id'],
            position_gps: l['latitude']+','+l['longitude'],
            time:day
          }
          this.network.post(this.c.LOCATION,p)
          .then( locality =>{
            if( locality['zone'] ){
              if( locality['zone']['products'] ){
                this.locale=locality;
                resolve(locality);
              }else{
                reject("NO_PRODUCTS");
              }
            }else{
              reject("NO_ZONE");
            }
          })
          .catch( err =>{
            reject("NETWORK_ERROR");
          })
        })
        .catch( err =>{
          reject("DEVICE_ERROR");
        })
      })
      .catch( err =>{
        reject(err.message)
      })
    })
  }

  getSchedule(){
    return ;
  }

  getLocation(){
    return this.locale;
  }

  setProduct(product, amount){
    this.sale.product = product;
    this.sale.amount = amount;
    this.createOrder();
  }

  getProduct(){
    return this.sale;
  }


  updateLocationAddress(loc,address,number,complement){
    const up ={
      position_maps:loc[0]+","+loc[1],
      street:address,
      num:number,
      complement:complement
    }
    this.locale['number']=number;
    this.locale['complement']=complement;
    this.network.put(this.network.c.LOCATION+this.locale['id'],up)
    .then(l=>{
      this.locale=l;
    })
  }
  setVoucher(voucher){
    this.voucher=voucher;
  }
  getVoucher(){
    return this.voucher;
  }
  removeVoucher(){
    this.voucher=null;
  }

  getOrder(){
    return {
      location:this.locale,
      product:this.sale
    }
  }

  createOrder(){
    let sale={
      location:this.locale['id'],
      payment:'money',
      product: this.sale.product['beer']['id'],
      price:this.sale.product['beer']['price']*this.sale['amount'],
      amount:this.sale['amount'],
      amount_discount:this.sale.product['beer']['price']*this.sale['amount'] - this.sale.product['price'],
      voucher:this.voucher?this.voucher :null,
      freight_value:this.locale['zone']['free_shipping']?0:this.locale['zone']['freight_value']
    }
    this.network.post(this.network.c.SALE,sale)
    .then( data => {
      this.sale.id=data['id'];
    })
  }

  completeOrder(pay){
    return new Promise((resolve, reject)=> {
      if(!pay){
        reject({code:2000,message:"Selecione um meio de Pagamento"});
      }
      let sale = {
        id_location:this.locale['id'],
        payment:pay,
        product: this.sale.product['beer']['id'],
        price:this.sale.product['beer']['price']*this.sale['amount'],
        amount:this.sale['amount'],
        amount_discount:this.sale.product['beer']['price']*this.sale['amount'] - this.sale.product['price'],
        voucher:this.voucher?this.voucher :null,
        freight_value:this.locale['zone']['free_shipping']?0:this.locale['zone']['freight_value']

      }
      this.network.put(this.network.c.SALE+this.sale.id,sale)
      .then( data => {
        resolve(data);
      })
      .catch( e =>{
        reject(e);
        // console.log("e-> ",e)
      })
    })
  }

  getOrders(){
    return new Promise((resolve, reject)=> {
      this.network.get(this.network.c.SALE)
      .then(orders =>{
        resolve(orders);
      })
    })
  }

  rateOrder(r){
    return new Promise((resolve, reject)=> {
      let rate ={
        id_sale:r.id_sale,
        who:2,
        rate:r.rate,
        comment:r.comment
      };
      this.network.post(this.network.c.RATE,rate)
      .then(res =>{
        resolve(res);
      })
      .catch(e=>{
        console.log('eero ->',e)
      })
    })
  }




}
