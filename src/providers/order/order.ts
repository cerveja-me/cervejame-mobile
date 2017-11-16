import { Injectable } from '@angular/core';

//providers
import { LocationProvider } from '../location/location';
import { NetworkProvider } from '../network/network';
import { DeviceProvider } from '../device/device';
import { ConstantsProvider } from '../constants/constants';

@Injectable()
export class OrderProvider {
  selected={
    product:{},
    amount:0
  }
  location;
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
            id_device: d.id,
            position_gps: l.latitude+','+l.longitude
          }
          this.network.post(this.c.LOCATION,p)
          .then( locality =>{
            if( locality.zone ){
              if( locality.zone.products ){
                this.location=locality;
                resolve(locality);
              }else{
                reject("NO_PRODUCTS");
              }
            }else{
              reject("NO_ZONE");
            }
          })
          .catch( err =>{
            console.log('network err ->',err);
            reject(err);
          })
        })
        .catch( err =>{
          console.log('device error ->',err);
          reject(err);
        })
      })
      .catch( err =>{
        console.log('location error ->',err);
        reject(err);
      })
    })
  }

  getLocation(){
    return this.location;
  }

  setProduct(product, amount){
    this.selected.product = product;
    this.selected.amount = amount;
  }

  getProduct(){
    return this.selected;
  }

  updateLocationAddress(loc,address,number,complement){
    const up ={
      position_maps:loc[0]+","+loc[1],
      street:address,
      num:number,
      complement:complement
    }
    this.location.number=number;
    this.location.complement=complement;
    this.network.put(this.network.c.LOCATION+this.location.id,up)
    .then(l=>{
        this.location=l;
    })
  }

  getOrder(){
    return {
      location:this.location,
      product:this.selected
    }
  }




}
