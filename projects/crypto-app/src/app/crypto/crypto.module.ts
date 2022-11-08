import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectCoinTypeFormComponent } from './select-coin-type-form/select-coin-type-form.component';
import { DataContainerComponent } from './data-container/data-container.component';
import { CoinService } from './coin.service';
import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';

import { NetworkInterceptor } from './network.interceptor';
import { SharedModule } from '../modules/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PreviewComponent } from './preview/preview.component';

@NgModule({
  declarations: [SelectCoinTypeFormComponent, DataContainerComponent, PreviewComponent],
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  exports: [DataContainerComponent],
  providers: [
    CoinService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NetworkInterceptor,
      multi: true,
    },
  ],
})
export class CryptoModule {}
