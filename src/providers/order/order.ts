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
          const p={
            id_device: d['id'],
            position_gps: l['latitude']+','+l['longitude']
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
        reject("LOCATION_ERROR")
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
      product:{
        price:this.sale.product['beer']['price']*this.sale['amount'],
        amount:this.sale['amount'],
        id:this.sale.product['beer']['id']
      },
      discount:this.sale.product['beer']['price']*this.sale['amount'] - this.sale.product['price'],
      voucher:this.voucher?this.voucher['id']:null
    }
    this.network.post(this.network.c.SALE,sale)
    .then( data => {
      this.sale.id=data['id'];
    })
  }

  completeOrder(){
    // if(this.user.)
  }




}
