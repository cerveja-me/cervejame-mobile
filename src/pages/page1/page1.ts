import { Component } from '@angular/core';
import { ModalController, Platform, NavParams } from 'ionic-angular';

import { ModalContentPage } from '../modal-receipt/modal-receipt';
import { ModalTourPage } from '../modal-tour/modal-tour';

import { User } from '../../providers/user';


@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html'
})
export class Page1 {

  constructor(public modalCtrl: ModalController, private user: User) {
    user.firstTimeApp()
    .then((res)=>{
      if(res){
        let modal = this.modalCtrl.create(ModalTourPage, {charNum: 0});
        modal.present();
      }
    });
  }
  sliderOptions = {
    slidesPerView:2,
    centeredSlides:true,
    loop:true
  };

  openModal(characterNum){
    let modal = this.modalCtrl.create(ModalContentPage, characterNum);
    modal.present();
  }

}

