import { Component, Input, OnInit } from '@angular/core';
import { IcoinApiResponse } from '../models/coinApiResponse.interface';
import { CoinService } from '../coin.service';
import { map, Observable, tap } from 'rxjs';
import { IqueryData } from '../models/queryData.interface';

@Component({
  selector: 'preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss'],
})
export class PreviewComponent implements OnInit {
  dataToView!: IcoinApiResponse;
  timeOfData$!: Observable<Date>;

  @Input() set data(coinData: IcoinApiResponse) {
    this.dataToView = coinData;
  }

  constructor(private coinService: CoinService) {}

  ngOnInit(): void {}

  refreshData() {
    this.coinService.refreshCrytoData$
      .pipe(
        map((value: IqueryData) =>
          this.coinService.handleStreamSubscription(value)
        )
      )
      .subscribe();

    this.coinService.coinDataStream$
      .pipe(
        tap((value) =>
          console.log(`Actual price of coin: ${value.coinData.close}`)
        )
      )
      .subscribe();

    this.coinService.coinDataStream$.unsubscribe();
  }
}
