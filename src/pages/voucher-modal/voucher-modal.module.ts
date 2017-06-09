import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VoucherModalPage } from './voucher-modal';

@NgModule({
  declarations: [
    VoucherModalPage,
  ],
  imports: [
    IonicPageModule.forChild(VoucherModalPage),
  ],
  exports: [
    VoucherModalPage
  ]
})
export class VoucherModalPageModule {}
