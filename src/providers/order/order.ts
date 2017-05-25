import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { DeviceProvider } from '../device/device';
import { GeolocationProvider } from '../geolocation/geolocation';

/*
  Generated class for the OrderProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
    */
  @Injectable()
  export class OrderProvider {
    product;
    location;

    constructor(
      public http: Http,
      public device:DeviceProvider,
      public geoloc:GeolocationProvider
      ) {}

    getZone(){
      return new Promise((resolve, reject)=> {
        this.geoloc.getPosition()
        .then(pos=>{
          var d=this.device.getDevice();
          this.device.post(this.device.API+this.device.LOCATION,{"device":d.uuid,"location":pos['latitude']+","+pos['longitude']})
          .then(res=>{

            if(res['products'] && res['products'].length > 0 ){
              res['products']=res['products'].map(this.convertProducts);
              this.location=res;
              resolve(res);
            }else{
              if(res['zone']){
                reject({message:"NO_ACTIVE_PRODUCTS"});
              }else{
                reject({message:"NO_ZONE_AVAILABLE"});
              }
            }
          })
        })
        .catch(reject);
      })
    }
    getLocation(){
      return this.location;
    }

    convertProducts(p){
      p.product.qtd=p.product.description.split(" ", 1)[0];
      p.unitvalue=parseFloat((p.price/p.product.qtd).toFixed(2));
      if(!p.product.cold){
        p.product.details=JSON.parse(p.product.description);
      }
      return p;
    }
    getProduct(){
      return this.product;
    }
    setProduct(p){
      this.product=p;
    }

    createSale(data){
      return new Promise((resolve, reject) => {
        this.device.post(this.device.API+this.device.SALE,data)
        .then((res)=>{
          resolve(res);
        })
        .catch(reject);
      })
    }
  }
