import { Injectable } from '@angular/core';
import { Http,Response,Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Storage } from '@ionic/storage';
import {SHA256} from 'crypto-js/sha256"';

import { Device } from './device';
import {ConstantService} from  './constant-service'; //This is my Constant Service
import { Error } from './error';

/*
  Generated class for the User provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
    */
  @Injectable()
  export class User {
    items: Array<{}>;

    constructor(
      private _http: Http,
      private _device:Device,
      private _storage:Storage,
      private _err:Error,
      private cs: ConstantService){}

    getSaleFeedBack(){
      return new Promise((resolve, reject) => {
        this.isUserLogged()
        .then(log=>{
          if(log){
            this.getLoggedUser()
            .then(userll=>{

              let id=userll['costumer'].id;

              this._http.get(this.cs.API+this.cs.COSTUMER+this.cs.LASTBUY+id)
              .toPromise()
              .then(sale=>{
                console.log('asdasdasd',sale);
                try{
                  resolve(sale.json());
                }catch(e){
                  reject();
                }
              })
              .catch(err=>{
                reject();
              })

            })
          }else{
            reject();
          }
        })
      })
    }

    getLastSale(){
      return new Promise((resolve, reject) => {
        this.isUserLogged()
        .then(log=>{
          if(log){
            this.getLoggedUser()
            .then(userll=>{
              let id=userll['costumer'].id;
              console.log('user->',id);
              this._http.get(this.cs.API+this.cs.COSTUMER+this.cs.LASTBUYOPEN+id)
              .toPromise()
              .then(sale=>{
                console.log('asdasdasd',sale.json());
                try{
                  resolve(sale.json());
                }catch(e){
                  reject();
                }
              })
              .catch(err=>{

                reject();
              })

            })
          }else{
            reject();
          }
        })
      })
    }

    convertProducts(p){
      p.product.qtd=p.product.description.split(" ", 1)[0];
      p.unitvalue=parseFloat((p.price/p.product.qtd).toFixed(2));

      return p;
    }

    getProducts(){
      return new Promise((resolve, reject) => {
        this._device.getDevice()
        .then((dev)=>{
          this._device.getLocation()
          .then((location)=>{

            let body = JSON.stringify({ "device":dev['id'],"location":location[0]+","+location[1]});
            let headers = new Headers({ 'Content-Type': 'application/json'});
            let options = new RequestOptions({ headers: headers, method: "post" });

            this._http.post(this.cs.API+this.cs.LOCATION, body,options)
            .toPromise()
            .then((res)=>{

              this._device.setDevice(res.json());
              let data = res.json();
              if(data.products && data.products.length>0 ){
                data.products=data.products.map(this.convertProducts);
              }

              resolve(data);
            })
            /* error ao consultar o servidor em busca da regiao */
            .catch(e=>{
              this._err.sendError('USER_BUSCAR_REGIAO',e);
              reject(e);
            });
          })
          .catch(e=>{
            /* error ao obter a localização do caboclo */
            this._err.sendError('USER_OBTER_LOCALIZACAO',e);
            reject();
          });
        })
        .catch(e=>{
          this._err.sendError('USER_GET_DEVICE',e);
          reject();
        });
      });
    }

    getNewLocation(loc, address){
      return new Promise((resolve, reject) => {
        this._device.getDevice()
        .then((dev)=>{
          let body = JSON.stringify({ "device":dev['device'],"location":loc[0]+","+loc[1], "address":address});
          let headers = new Headers({ 'Content-Type': 'application/json'});
          let options = new RequestOptions({ headers: headers, method: "post" });
          this._http.post(this.cs.API+this.cs.LOCATION, body,options)
          .toPromise()
          .then((res)=>{

            resolve(res.json());
          })
          .catch(e=>{
            this._err.sendError('USER_BUSCAR_REGIAO',e);
          });
        })
        .catch(e=>{
          this._err.sendError('USER_GET_DEVICE',e);
          reject();
        });
      });
    }

    getAddressFromLocation(loc){
      return new Promise((resolve, reject) => {
        this._device.getAddressFromLocation(loc)
        .then(address=>{
          return this.getNewLocation(loc,address['formated'])
          .then(l=>{
            this._device.getDevice()
            .then(d=>{
              //verificar aqui se é a mesma zona
              // por hr supomos que sim
              // this._device.setDevice(l);
              resolve(address);
            })
          })
        })
      })
    }

    isUserLogged(){

      return new Promise((resolve, reject) => {
        this.getLoggedUser()
        .then((o)=>{

          if(o!=null){
            resolve( true);
          }else{
            resolve(false);
          }
        });
      });
    }
    setLoggedUser(user){
      this._storage.set('user_logged',user);
    }

    getLoggedUser(){
      return new Promise((resolve, reject) => {
        this._storage.get('user_logged')
        .then((user)=>{
          resolve(user);
        });
      });
    }

    createUser(u){
      return new Promise((resolve, reject) => {
        this._device.getDevice()
        .then((devi)=>{
          u.device=devi['device'];
          let body = JSON.stringify(u);
          let headers = new Headers({ 'Content-Type': 'application/json'});
          let options = new RequestOptions({ headers: headers, method: "post" });
          this._http.post(this.cs.API+this.cs.COSTUMER, body,options)
          .toPromise()
          .then((res)=>{
            resolve(res.json());
          })
          .catch(this.handleError);
        })
      })
    }

    loginUser(u){
      return new Promise((resolve, reject) => {
        this._device.getDevice()
        .then(d=>{
          u.device =d['device'];
          let body = JSON.stringify(u);
          let headers = new Headers({ 'Content-Type': 'application/json'});
          let options = new RequestOptions({ headers: headers, method: "post" });

          this._http.post(this.cs.API+this.cs.AUTH, body,options)
          .toPromise()
          .then((res)=>{
            resolve(res.json());
          })
          .catch(this.handleError);
        })
      })
    }

    facebookRegister(fu){
      return new Promise((resolve, reject) => {
        let u ={
          name:fu.name,
          email:fu.email,
          password:fu.id,
          facebook_id:fu.id,
          facebook_token:fu.auth.accessToken
        }
        this.loginUser(u)
        .then(res =>{
          if(res['err']==null){
            resolve(res);
          }else{
            this.createUser(u)
            .then(re =>{
              if(res['err']==null){
                resolve(res);
              }else{
                reject();
              }
            });
          }
        });
      });
    }


    updateUser(user){
      return new Promise((resolve, reject) => {
        this._device.getDevice()
        .then(d=>{
          user.device =d['device'];
          let body = JSON.stringify(user);
          let headers = new Headers({ 'Content-Type': 'application/json'});
          let options = new RequestOptions({ headers: headers, method: "post" });

          this._http.post(this.cs.API+this.cs.COSTUMER+this.cs.COSTUMER_UPDATE, body,options)
          .toPromise()
          .then((res)=>{
            resolve(res.json());
          })
          .catch(this.handleError);
        })
      })
    }
    // sendUser(u){
      //   return new Promise((resolve, reject) => {
        //     let body = JSON.stringify(u);
        //     let headers = new Headers({ 'Content-Type': 'application/json'});
        //     let options = new RequestOptions({ headers: headers, method: "post" });

        //     this._http.post(this.cs.API+this.cs.COSTUMER, body,options)
        //     .toPromise()
        //     .then((res)=>{
          //       // this._device.setDevice(res.json());
          //       resolve(res.json());
          //     })
          //     .catch(this.handleError);
          //   })
          // }


          // registerUser(user){
            //   return new Promise((resolve, reject) => {
              //     this._device.getDevice()
              //     .then((devi)=>{
                //       let u ={
                  //         device:devi['device'],
                  //         name:user.name,
                  //         email:user.email,
                  //         password:user.id,
                  //         facebook_id:user.id,
                  //         facebook_token:user.auth.accessToken
                  //       }
                  //       this.sendUser(u)
                  //       .then((result)=>{
                    //         this.setLoggedUser(result);
                    //         resolve(result);
                    //       });
                    //     });
                    //   })
                    // }
                    fakeuser(){
                      this._storage.set('user_logged', {
                        "device": "ae0d2c72-d438-4760-a021-164013a3457a",
                        "name": "Jeferson F Guardezi",
                        "email": "guardezi@cerveja.me",
                        "password": "123123123",
                        "facebook_id": "guardezi",
                        "facebook_token": "123817237817238718273",
                        "id": "a4f60b88-7a8b-49a5-8ad4-7e138723ef7e"
                      })
                    }






                    private extractData(res: Response) {
                      let body = res.json();
                      this._device.setDevice(body.data);
                      return body.data || { };
                    }
                    private handleError (error: Response | any) {
                      console.log('err->',error);
                    }
                    private api= {
                    }





                  }
