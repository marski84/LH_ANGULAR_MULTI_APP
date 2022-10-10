import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WholesalerComponent } from './wholesaler/wholesaler.component';

@NgModule({
  declarations: [WholesalerComponent],
  imports: [CommonModule],
  exports: [WholesalerComponent],
})
export class WholesalerModule {}
