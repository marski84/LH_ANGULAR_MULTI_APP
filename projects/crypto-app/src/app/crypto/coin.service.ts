import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  map,
  Observable,
  of,
  timer,
  ReplaySubject,
  tap,
  combineLatest,
} from 'rxjs';
import { IselectValue } from './models/selectValue.interface';
import { IcoinApiResponse } from './models/coinApiResponse.interface';
import { bitCoinFormData } from './models/bitCoinFormData.interface';
import { Subject, switchMap } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { apiResponse } from './models/apiResponse.interface';

@Injectable({
  providedIn: 'root',
})
export class CoinService implements OnInit, OnDestroy {
  // https://api.kucoin.com/api/v1/market/stats?symbol=BTC-USDT

  // currencyList
  // https://api.kucoin.com/api/v2/symbols

  coinDataStream$: Subject<IcoinApiResponse> = new Subject<IcoinApiResponse>();

  refreshCrytoData$: ReplaySubject<void> = new ReplaySubject<void>();

  private onDestroy$: Subject<void> = new Subject<void>();
  // private timer$ = timer(0, 20000).pipe(
  //   switchMap(() => this.getbitCoinData(formData)),
  //   tap((value) => console.log(value)),
  //   map((value) => value)
  // );

  constructor(private httpService: HttpClient) {}
  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  private availabaleBitCoins: IselectValue[] = [
    {
      value: 'eth-ethereum',
      viewValue: 'Ethereum',
    },
    {
      value: 'btc-bitcoin',
      viewValue: 'Bitcoin',
    },
    {
      value: 'usdt-tether',
      viewValue: 'Tether',
    },
    { value: 'doge-dogecoin', viewValue: 'Dogecoin' },
    { value: 'hex-hex', viewValue: 'Hex' },
    { value: 'shib-shiba-inu', viewValue: 'Shiba Inu' },
    { value: 'bch-bitcoin-cash', viewValue: 'Bitcoin Cash' },
    { value: 'kava-kava', viewValue: 'Kava' },
  ];

  private exchangeCurrencyList: IselectValue[] = [
    {
      value: 'USD',
      viewValue: 'USD',
    },

    {
      value: 'BTC',
      viewValue: 'Bitcoin',
    },
  ];

  private getbitCoinData(
    formData: bitCoinFormData
  ): Observable<IcoinApiResponse> {
    const { bitCoinType, exchangeCurrencyType } = formData;

    console.log(formData);

    const params: HttpParams = new HttpParams().set(
      'quote',
      exchangeCurrencyType
    );

    return this.httpService
      .get<apiResponse[]>(
        `https://api.coinpaprika.com/v1/coins/${bitCoinType}/ohlcv/today`,
        { params: params }
      )
      .pipe(
        map((response) => {
          return new Object({
            coinData: response[0],
            timeStamp: new Date(),
          }) as IcoinApiResponse;
        }),
        tap((value) => this.coinDataStream$.next(value))
      );
  }

  getData(formData: bitCoinFormData): Observable<IcoinApiResponse> {
    return timer(0, 20000).pipe(
      switchMap(() => this.getbitCoinData(formData)),
      tap((value) => console.log(value))
      // map((value) => value)
    );
  }

  // // 1. timer wyrzucić do properties'a tego serwisu
  // // 2. dwie metody enable i disable

  // enable() {
  //   this.timer$.subscribe(); // zapisać wynik jako properties
  // }
  // disable() {
  //   // tutaj usuwać sub'a
  // }

  getFreshCoinData() {
    this.refreshCrytoData$.next();
  }

  getBitCoinList() {
    return of(this.availabaleBitCoins);
  }

  getCurrencyList() {
    return of(this.exchangeCurrencyList);
  }
}
