import { Component, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { CoinService } from '../coin.service';
import { bitCoinFormData } from '../models/bitCoinFormData.interface';
import { IcoinApiResponse } from '../models/coinApiResponse.interface';

@Component({
  selector: 'app-data-container',
  templateUrl: './data-container.component.html',
  styleUrls: ['./data-container.component.scss'],
})
export class DataContainerComponent implements OnInit {
  constructor(private coinService: CoinService) {}

  bitCoinStreamSubscription$!: Subject<IcoinApiResponse[]>;
  timerStreamSubscription$!: Subscription;

  ngOnInit(): void {
    this.bitCoinStreamSubscription$ = this.coinService.coinDataStream$;
  }

  handleSubscription(formData: bitCoinFormData) {
    this.handleStreamSubscirption(formData);
  }

  private handleStreamSubscirption(formData: bitCoinFormData) {
    if (this.timerStreamSubscription$) {
      this.timerStreamSubscription$.unsubscribe();
    }

    this.timerStreamSubscription$ = this.coinService
      .getData(formData)
      .subscribe();
  }
}
