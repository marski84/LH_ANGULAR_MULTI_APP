import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { CoinService } from '../coin.service';
import { IcoinApiResponse } from '../models/coinApiResponse.interface';
import { IqueryData } from '../models/queryData.interface';
import { SelectCoinTypeFormComponent } from '../select-coin-type-form/select-coin-type-form.component';

@Component({
  selector: 'app-data-container',
  templateUrl: './data-container.component.html',
  styleUrls: ['./data-container.component.scss'],
})
export class DataContainerComponent implements OnInit {
  bitCoinStreamSubscription$: Subject<IcoinApiResponse> =
    this.coinService.coinDataStream$;

  constructor(private coinService: CoinService) {}

  ngOnInit(): void {}

  catchFormChanged(queryData: IqueryData) {
    this.coinService.handleStreamSubscription(queryData);
  }
}
