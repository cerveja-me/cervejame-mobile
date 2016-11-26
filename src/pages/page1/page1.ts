import { Component } from '@angular/core';

import { ModalContentPage } from '../modal-receipt/modal-receipt';
import { ModalController, Platform, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html'
})
export class Page1 {

  constructor(public modalCtrl: ModalController) { };
  sliderOptions = {
    slidesPerView:2,
    centeredSlides:true
  };

  openModal(characterNum){
    let modal = this.modalCtrl.create(ModalContentPage, characterNum);
    modal.present();
  }

}

