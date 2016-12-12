import {Injectable} from '@angular/core';

@Injectable()
export class ConstantService {

  API :string;
  DEVICE: string;
  LOCATION: string;
  COSTUMER: string;
  GOOGLE_GEOCODE: string;
  GOOGLE_ADDRESS: string;
  constructor() {
    this.API = 'https://api.cerveja.me/';
    this.DEVICE = 'device';
    this.LOCATION = 'location';
    this.COSTUMER = 'costumer';
    this.GOOGLE_GEOCODE ='https://maps.googleapis.com/maps/api/geocode/json?address=#&key=AIzaSyCviMvRgOLra4U-obeRi33K0Cur5WlGTQg';
    this.GOOGLE_ADDRESS = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=#&key=AIzaSyCviMvRgOLra4U-obeRi33K0Cur5WlGTQg';
  }
}
