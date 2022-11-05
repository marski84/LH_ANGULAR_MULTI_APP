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
import { SharedModule } from '../../../../jokes-app/src/app/modules/shared/shared.module';
import { NetworkInterceptor } from './network.interceptor';

@NgModule({
  declarations: [SelectCoinTypeFormComponent, DataContainerComponent],
  imports: [CommonModule, SharedModule, HttpClientModule],
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
