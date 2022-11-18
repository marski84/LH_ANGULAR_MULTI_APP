import { Component, OnInit } from '@angular/core';
import { Subject, Subscription, tap, timer } from 'rxjs';
import { CoinService } from '../coin.service';
import { IcoinApiResponse } from '../models/coinApiResponse.interface';
import { IqueryData } from '../models/queryData.interface';

@Component({
  selector: 'app-data-container',
  templateUrl: './data-container.component.html',
  styleUrls: ['./data-container.component.scss'],
})
export class DataContainerComponent implements OnInit {
  bitCoinStreamSubscription$!: Subject<IcoinApiResponse>;
  constructor(private coinService: CoinService) {}

  ngOnInit(): void {
    this.bitCoinStreamSubscription$ = this.coinService.coinDataStream$;
  }

  handleSubscription(queryData: IqueryData) {
    this.coinService.refreshCrytoData$.next(queryData);
    this.coinService.handleStreamSubscription(queryData);
  }
}
