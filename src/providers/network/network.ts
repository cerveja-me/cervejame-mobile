import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

//providers
import { ConstantsProvider } from '../constants/constants';

@Injectable()
export class NetworkProvider {

  constructor(
    public c: ConstantsProvider,
    private http: HttpClient,
    private storage:Storage
  ) {
  }

  post(endpoint, data){
    return new Promise((resolve, reject) => {
      this.storage.get(this.c.AUTH)
      .then( t =>{
        let h;
        if(t){
          h=new HttpHeaders()
          .append('Content-Type', 'application/json')
          .append('Authorization','Bearer '+t);
        }else{
          h=new HttpHeaders()
          .append('Content-Type', 'application/json');
        }
        this.http.post(this.c.API+endpoint, JSON.stringify(data),{
          headers: h
        })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
      });
    });
  }

  put(endpoint, data){
    return new Promise((resolve, reject) => {
      this.storage.get(this.c.AUTH)
      .then( t =>{
        let h;
        if(t){
          h=new HttpHeaders()
          .append('Content-Type', 'application/json')
          .append('Authorization','Bearer '+t);
        }else{
          h=new HttpHeaders()
          .append('Content-Type', 'application/json');
        }
        this.http.put(this.c.API+endpoint, JSON.stringify(data),{
          headers: h
        })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
      });
    });
  }

  get(endpoint){
    return new Promise((resolve, reject) => {
      this.storage.get(this.c.AUTH)
      .then( t =>{
        let h;
        if(t){
          h=new HttpHeaders()
          .append('Content-Type', 'application/json')
          .append('Authorization','Bearer '+t);
        }else{
          h=new HttpHeaders()
          .append('Content-Type', 'application/json');
        }
        this.http.get(this.c.API+endpoint, {
          headers: h
        })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
      });
    });
  }

}
