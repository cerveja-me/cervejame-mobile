import {Injectable} from '@angular/core';

@Injectable()
export class ConstantService {

  API :string;
  DEVICE: string;
  LOCATION: string;
  COSTUMER: string;
  GOOGLE_GEOCODE: string;
  GOOGLE_ADDRESS: string;
  AUTH:string;
  COSTUMER_UPDATE:string;
  SALE:string;
  FIRSTIME:string;
  LASTBUY:string;
  LASTBUYOPEN:string;
  SEND_FEEDBACK:string;
  PUSH:string;
  constructor() {
    this.API = 'http://api.cerveja.me/';
    this.DEVICE = 'device/';
    this.AUTH='auth/login';
    this.LOCATION = 'location/';
    this.COSTUMER = 'costumer/';
    this.COSTUMER_UPDATE = 'update/';
    this.LASTBUY = 'lastbuy/';
    this.LASTBUYOPEN = 'lastbuyOpen/';
    this.SEND_FEEDBACK='sendfeedback/';
    this.SALE = 'sale/';
    this.GOOGLE_GEOCODE ='https://maps.googleapis.com/maps/api/geocode/json?address=#&rankby=distance&key=AIzaSyCviMvRgOLra4U-obeRi33K0Cur5WlGTQg';
    this.GOOGLE_ADDRESS = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=#&key=AIzaSyCviMvRgOLra4U-obeRi33K0Cur5WlGTQg';
    this.FIRSTIME = 'ftime';
    this.PUSH='fcm_token';
  }
}
