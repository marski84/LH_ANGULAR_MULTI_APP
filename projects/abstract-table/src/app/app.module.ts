import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContainerComponent } from './container/container.component';
import { MaterialModule } from '../../../modules/material/material.module';
import { SharedModule } from '../../../modules/shared/shared.module';
import { ProductModuleComponent } from './product/product-module.component';
import { WholesalerModuleComponent } from './modules/wholesaler-module/wholesaler/wholesaler-module.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { DataKeyPipe } from './pipes/data-key.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { AbstractTableComponent } from './abstract-table/abstract-table.component';
// import { TableItemEditFormComponent } from './abstract-table/table-item-edit-form/table-item-edit-form.component';
import { WholesalerModule } from './modules/wholesaler-module/wholesaler.module';
import { ProductModule } from './modules/product-module/product.module';
import { AbstractTableModule } from './modules/abstract-table/abstract-table.module';

@NgModule({
  declarations: [
    AppComponent,
    ContainerComponent,
    ProductModuleComponent,
    WholesalerModuleComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    WholesalerModule,
    ProductModule,
    AbstractTableModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
