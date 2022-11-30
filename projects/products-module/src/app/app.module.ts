import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ViewContainerComponent } from './view-container/view-container.component';
import { ProductsListModule } from './modules/products-list/products-list.module';
import { ProductModule } from './modules/product/product.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent, ViewContainerComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ProductsListModule,
    ProductModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
