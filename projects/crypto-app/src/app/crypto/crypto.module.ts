import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectCoinTypeFormComponent } from './select-coin-type-form/select-coin-type-form.component';
import { DataContainerComponent } from './data-container/data-container.component';
import { CoinService } from './coin.service';

@NgModule({
  declarations: [SelectCoinTypeFormComponent, DataContainerComponent],
  imports: [CommonModule],
  providers: [CoinService],
})
export class CryptoModule {}
