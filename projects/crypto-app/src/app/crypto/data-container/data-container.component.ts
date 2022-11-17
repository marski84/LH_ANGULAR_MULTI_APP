import { Component, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { CoinService } from '../coin.service';
import { bitCoinFormData } from '../models/bitCoinFormData.interface';
import { IcoinApiResponse } from '../models/coinApiResponse.interface';
import { formDataTuple } from '../models/formDataTuple';

@Component({
  selector: 'app-data-container',
  templateUrl: './data-container.component.html',
  styleUrls: ['./data-container.component.scss'],
})
export class DataContainerComponent implements OnInit {
  bitCoinStreamSubscription$!: Subject<IcoinApiResponse>;
  timerStreamSubscription!: Subscription;
  constructor(private coinService: CoinService) {}

  ngOnInit(): void {
    this.bitCoinStreamSubscription$ = this.coinService.coinDataStream$;
  }

  handleSubscription(queryData: formDataTuple) {
    const formData = {
      bitCoinType: queryData[0],
      exchangeCurrencyType: queryData[1],
    };
    console.log(formData);

    this.handleStreamSubscirption(formData);
  }

  private handleStreamSubscirption(formData: bitCoinFormData) {
    this.timerStreamSubscription = this.coinService
      .getData(formData)
      .subscribe();
  }
}
