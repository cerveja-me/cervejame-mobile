import { ViewController} from 'ionic-angular';
import { Component } from '@angular/core';
@Component({
  templateUrl: 'modal-item.html'
})

export class ModalItem {

  constructor(private viewCtrl: ViewController) {
  }

  dismiss(data) {
    this.viewCtrl.dismiss(data);
  }

}
