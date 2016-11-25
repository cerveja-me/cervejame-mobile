import { Component } from '@angular/core';
import {ModalItem} from '../modal-item';


import { Modal,NavController } from 'ionic-angular';

@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html'
})
export class Page1 {

  constructor(public navCtrl: NavController) {

  }
  showModal(){
    const modal =  ModalItem();
    modal.show();
  }

}
