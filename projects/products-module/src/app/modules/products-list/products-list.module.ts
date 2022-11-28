import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsListComponent } from './products-list/products-list.component';
import { HttpClientModule } from '@angular/common/http';
import { TableComponent } from './table/table.component';
import { MaterialModule } from '../material/material.module';
import { DataKeyPipe } from './table/pipes/data-key.pipe';
import { ProductsListRoutingModule } from './products-list/product-list-routing.module';
import { ProductModule } from '../product/product.module';

@NgModule({
  declarations: [ProductsListComponent, TableComponent, DataKeyPipe],
  imports: [
    CommonModule,
    ProductsListRoutingModule,
    HttpClientModule,
    MaterialModule,
    ProductModule,
  ],
  exports: [ProductsListComponent],
})
export class ProductsListModule {}
