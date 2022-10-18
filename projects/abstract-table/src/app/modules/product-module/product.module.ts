import { AbstractTableModule } from '../abstract-table-module/abstract-table.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product/product.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [ProductComponent],
  imports: [CommonModule, AbstractTableModule,
    MatTableModule,
    MatButtonModule,],
  exports: [ProductComponent],
})
export class ProductModule {}
