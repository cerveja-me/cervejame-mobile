import { Injectable } from '@angular/core';

@Injectable()
export class ConstantsProvider {
  //  public API:string='http://ec2-54-207-94-27.sa-east-1.compute.amazonaws.com/api/';
  //  public API:string='http://localhost:1337/ec2-54-207-94-27.sa-east-1.compute.amazonaws.com/api/';
  //  public API:string='http://10.42.0.1:9001/api/';
  public API: string = 'http://999eb3d2.ngrok.io/api/';
  public DEVICE: string = 'device/';
  public LOCATION: string = 'location/';
  public PROFILE: string = 'profile/';
  public SALE: string = 'sale/';
  public VOUCHER: string = 'voucher/';
  public AUTH: string = this.PROFILE + 'auth/';
  public RATE: string = 'rate/';
  public USER: string = 'costumer/';
  public REMOTE_ASSETS: string = 'https://s3-sa-east-1.amazonaws.com/assests.cerveja.me';
  //public REMOTE_ASSETS:string='https://assets.cerveja.me/';
  UXCAM_KEY: string = '170c2a7fdadbaea';//tresux@cerveja.me
  GOOGLE_GEOCODE: string = 'https://maps.googleapis.com/maps/api/geocode/json?address=#&location=LAT,LNG&rankby=distance&key=AIzaSyCviMvRgOLra4U-obeRi33K0Cur5WlGTQg';
  GOOGLE_ADDRESS: string = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=#&key=AIzaSyCviMvRgOLra4U-obeRi33K0Cur5WlGTQg';
  SHARE_MESSAGE:string= 'Compartlhando com vc, use meu cupom e ganhe R$ 10';
}
