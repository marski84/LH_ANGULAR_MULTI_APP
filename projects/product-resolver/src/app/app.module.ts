import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductComponent } from './product/product.component';
import { ProductListComponent } from './product-list/product-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material/material.module';
import { SharedModule } from './modules/shared/shared.module';
import { DataKeyPipe } from './product-list/pipes/data-key.pipe';
import { ViewContainerComponent } from './view-container/view-container.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { NetworkInterceptor } from './network.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    ProductListComponent,
    DataKeyPipe,
    ViewContainerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MaterialModule,
    SharedModule,
    HttpClientModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: NetworkInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
