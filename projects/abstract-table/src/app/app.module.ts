import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContainerComponent } from './container/container.component';
import { MaterialModule } from '../../../modules/material/material.module';
import { SharedModule } from '../../../modules/shared/shared.module';
import { AbstractTableComponent } from './abstract-table/abstract-table.component';
import { ProductModuleComponent } from './abstract-table/product-module/product-module.component';

@NgModule({
  declarations: [AppComponent, ContainerComponent, AbstractTableComponent, ProductModuleComponent],
  imports: [BrowserModule, AppRoutingModule, MaterialModule, SharedModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
