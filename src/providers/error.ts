import { Injectable } from '@angular/core';
import { Http,Response,Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Storage } from '@ionic/storage';


@Injectable()
export class Error {

    constructor(public http: Http, public storage:Storage) {
        console.log('Hello Error Provider');
    }

    sendError(cod, s){
        this.storage.get('device')
        .then((val) => {
            let e = {
                coderror:cod,
                stack:s.message,
                device:val.id
            }
            let body = JSON.stringify(e);
            let headers = new Headers({ 'Content-Type': 'application/json'});
            let options = new RequestOptions({ headers: headers, method: "post" });
            this.http.post('http://api.cerveja.me/apperror', body,options)
            .toPromise()
            .then((res)=>{
                console.log(res.json());
            });
        });
    }
}
