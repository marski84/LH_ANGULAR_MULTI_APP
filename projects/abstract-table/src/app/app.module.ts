import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContainerComponent } from './container/container.component';
import { MaterialModule } from '../../../modules/material/material.module';
import { WholesalerModule } from './modules/wholesaler-module/wholesaler.module';
import { ProductModule } from './modules/product-module/product.module';
import { AbstractTableModule } from './modules/abstract-table-module/abstract-table.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [AppComponent, ContainerComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    AppRoutingModule,
    MaterialModule,
    // WholesalerModule,
    // ProductModule,
    AbstractTableModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
