import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';



/*
  Generated class for the User provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
    */
  @Injectable()
  export class User {

    constructor(public http: Http) {

    }
    firstTimeApp(){
      let storage =new Storage();
      return new Promise((resolve, reject) => {
        storage.get('ftime')
        .then((val) => {
          if(val){
            resolve(false);
          }else{
            storage.set('ftime', 'false');
            resolve(true);
          }
        });
      });



    }

  }
