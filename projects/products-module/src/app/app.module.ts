import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ViewContainerComponent } from './view-container/view-container.component';
import { ProductsListModule } from './modules/products-list/products-list.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomErrorHandler } from './custom-error-handler.service';
import { HttpClientModule } from '@angular/common/http';
import { ProductsListRoutingModule } from './modules/products-list/product-list-routing.module';

@NgModule({
  declarations: [AppComponent, ViewContainerComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ProductsListRoutingModule,
    ProductsListModule,
    BrowserAnimationsModule,
  ],
  providers: [CustomErrorHandler],
  bootstrap: [AppComponent],
})
export class AppModule {}
