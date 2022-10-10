import { AbstractTableModule } from '../abstract-table-module/abstract-table.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product/product.component';

@NgModule({
  declarations: [ProductComponent],
  imports: [CommonModule, AbstractTableModule],
  exports: [ProductComponent],
})
export class ProductModule {}
