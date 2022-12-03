import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsListComponent } from './products-list/products-list.component';
import { HttpClientModule } from '@angular/common/http';
import { TableComponent } from './table/table.component';
import { MaterialModule } from '../material/material.module';
import { DataKeyPipe } from './table/pipes/data-key.pipe';
import { ProductsListRoutingModule } from './product-list-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ProductComponent } from './product/product.component';
import { CustomErrorHandler } from '../../custom-error-handler.service';
import { TestComponent } from './test/test.component';

@NgModule({
  declarations: [
    ProductsListComponent,
    TableComponent,
    DataKeyPipe,
    ProductComponent,
    TestComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    SharedModule,
    ProductsListRoutingModule,
    MaterialModule,
  ],
  exports: [ProductsListComponent],
  providers: [CustomErrorHandler],
})
export class ProductsListModule {}
