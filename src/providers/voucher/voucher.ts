import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class VoucherProvider {

  constructor(public http: HttpClient) {

  }

}
