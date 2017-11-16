import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';



@Component({
  selector: 'page-modal-voucher',
  templateUrl: 'modal-voucher.html',
})
export class ModalVoucherPage {

  constructor(
    public viewCtrl: ViewController
  ) {
  }

  dismiss() {
    this.closing=true;
    setTimeout(() => {
      this.viewCtrl.dismiss();
    },300);
  }

}
