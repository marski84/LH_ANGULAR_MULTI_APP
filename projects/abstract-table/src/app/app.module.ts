import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContainerComponent } from './container/container.component';
import { MaterialModule } from '../../../modules/material/material.module';
import { SharedModule } from '../../../modules/shared/shared.module';
import { ProductModuleComponent } from './product-module/product-module.component';
import { WholesalerModuleComponent } from './wholesaler-module/wholesaler-module.component';
import { AbstractTableComponent } from './abstract-table/abstract-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { DataKeyPipe } from './pipes/data-key.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ContainerComponent,
    ProductModuleComponent,
    WholesalerModuleComponent,
    AbstractTableComponent,
    DataKeyPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    SharedModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
