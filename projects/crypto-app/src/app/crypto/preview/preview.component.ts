import { Component, Input, OnInit } from '@angular/core';
import { IcoinApiResponse } from '../models/coinApiResponse.interface';
import { CoinService } from '../coin.service';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss'],
})
export class PreviewComponent implements OnInit {
  dataToView!: IcoinApiResponse;

  timeOfData$!: Subject<Date>;

  @Input() set data(coinData: IcoinApiResponse[]) {
    this.dataToView = coinData[0];
  }

  constructor(private coinService: CoinService) {}

  ngOnInit(): void {
    console.log(this.data);
    this.timeOfData$ = this.coinService.timeOfData$;
  }
}
