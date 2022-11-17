import { Component, Input, OnInit } from '@angular/core';
import { IcoinApiResponse } from '../models/coinApiResponse.interface';
import { CoinService } from '../coin.service';
import { combineLatest, Observable, Subject, Subscription, tap } from 'rxjs';

@Component({
  selector: 'preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss'],
})
export class PreviewComponent implements OnInit {
  dataToView!: IcoinApiResponse;
  timeOfData$!: Observable<Date>;

  @Input() set data(coinData: IcoinApiResponse) {
    console.log(coinData);

    this.dataToView = coinData;
  }

  constructor(private coinService: CoinService) {}

  ngOnInit(): void {
    // console.log(this.data);
    // this.timeOfData$ = this.coinService.timeOfData$.asObservable();
  }

  refreshData() {
    this.coinService.getFreshCoinData();
  }
}
