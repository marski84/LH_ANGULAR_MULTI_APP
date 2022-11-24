import { Component, Input, OnInit } from '@angular/core';
import { IcoinApiResponse } from '../models/coinApiResponse.interface';
import { CoinService } from '../coin.service';
import { map, Observable, tap, take } from 'rxjs';
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
    this.coinService.refreshCrytoData$.next();
  }
}
