import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WholesalerComponent } from './wholesaler/wholesaler.component';
import { AbstractTableModule } from '../abstract-table-module/abstract-table.module';

@NgModule({
  declarations: [WholesalerComponent],
  imports: [CommonModule, AbstractTableModule],
  exports: [WholesalerComponent],
})
export class WholesalerModule {}
