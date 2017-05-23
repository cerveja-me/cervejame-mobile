import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { DeviceProvider } from '../../providers/device/device';
import { GeolocationProvider } from '../geolocation/geolocation';

/*
  Generated class for the OrderProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
    */
  @Injectable()
  export class OrderProvider {

    constructor(
      public http: Http,
      public device:DeviceProvider,
      public geoloc:GeolocationProvider
      ) {
      console.log('Hello OrderProvider Provider');
    }

    getZone(){
      return new Promise((resolve, reject)=> {
        this.geoloc.getPosition()
        .then(pos=>{
          var d=this.device.getDevice();
          console.log('buscar produtos -> ',{"device":d.uuid,"location":pos['latitude']});
          this.device.post(this.device.API+this.device.LOCATION,{"device":d.uuid,"location":pos['latitude']+","+pos['longitude']})
          .then(res=>{
            console.log('resposta->',res);
            if(res['products'] && res['products'].length > 0 ){
              res['products']=res['products'].map(this.convertProducts);
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


    convertProducts(p){
      p.product.qtd=p.product.description.split(" ", 1)[0];
      p.unitvalue=parseFloat((p.price/p.product.qtd).toFixed(2));
      if(!p.product.cold){
        p.product.details=JSON.parse(p.product.description);
      }
      return p;
    }

    // getProducts(){
      //   return new Promise((resolve, reject) => {
        //     this._device.getDevice()
        //     .then((dev)=>{
          //       this._device.getLocation()
          //       .then((location)=>{

            //         let body = JSON.stringify({ "device":dev['id'],"location":location[0]+","+location[1]});
            //         let headers = new Headers({ 'Content-Type': 'application/json'});
            //         let options = new RequestOptions({ headers: headers, method: "post" });

            //         this._http.post(this.cs.API+this.cs.LOCATION, body,options)
            //         .toPromise()
            //         .then((res)=>{

              //           this._device.setDevice(res.json());
              //           let data = res.json();
              //           if(data.products && data.products.length>0 ){
                //             data.products=data.products.map(this.convertProducts);
                //           }

                //           resolve(data);
                //         })
                //         /* error ao consultar o servidor em busca da regiao */
                //         .catch(e=>{
                  //           this._err.sendError('USER_BUSCAR_REGIAO',e);
                  //           reject(e);
                  //         });
                  //       })
                  //       .catch(e=>{
                    //         /* error ao obter a localização do caboclo */
                    //         this._err.sendError('USER_OBTER_LOCALIZACAO',e);
                    //         reject();
                    //       });
                    //     })
                    //     .catch(e=>{
                      //       this._err.sendError('USER_GET_DEVICE',e);
                      //       reject();
                      //     });
                      //   });
                      // }

                    }
