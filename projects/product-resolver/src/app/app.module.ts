import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent } from './product-list/product-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material/material.module';
import { SharedModule } from './modules/shared/shared.module';
import { DataKeyPipe } from './product-list/pipes/data-key.pipe';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { ErrorHandler } from './error-handler.interceptor';
import { AddProductComponent } from './product/add-product/add-product.component';
import { EditProductComponent } from './product/edit-product/edit-product.component';
import { ProductFormComponent } from './product/product-form/product-form.component';
import { ButtonComponent } from './product/button/button.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    DataKeyPipe,
    EditProductComponent,
    AddProductComponent,
    ProductFormComponent,
    ButtonComponent,
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
    { provide: HTTP_INTERCEPTORS, useClass: ErrorHandler, multi: true },
    // { provide: APP_INITIALIZER, useClass: NetworkInterceptor },
    // { provide: 'nasz_token', useValue: 'test', multi: true },
    // { provide: 'nasz_token', useValue: 'test2', multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

//1. injector
//2. dostawce
// 3. token
// elementInjector
// moduleINjector
