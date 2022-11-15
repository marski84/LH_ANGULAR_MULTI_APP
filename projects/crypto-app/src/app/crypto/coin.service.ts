import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  map,
  take,
  Observable,
  of,
  timer,
  ReplaySubject,
  interval,
  tap,
  share,
} from 'rxjs';
import { IselectValue } from './models/selectValue.interface';
import { IcoinApiResponse } from './models/coinApiResponse.interface';
import { bitCoinFormData } from './models/bitCoinFormData.interface';
import { Subject, switchMap, debounceTime } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root',
})
export class CoinService {
  // https://api.kucoin.com/api/v1/market/stats?symbol=BTC-USDT

  // currencyList
  // https://api.kucoin.com/api/v2/symbols

  formData!: bitCoinFormData;

  constructor(private httpService: HttpClient) {}

  coinDataStream$: Subject<IcoinApiResponse[]> = new Subject<
    IcoinApiResponse[]
  >();

  refreshCrytoData$: ReplaySubject<any> = new ReplaySubject<IcoinApiResponse>();

  timeOfData$: BehaviorSubject<Date> = new BehaviorSubject<Date>(new Date());

  availabaleBitCoins: IselectValue[] = [
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

  exchangeCurrencyList: IselectValue[] = [
    {
      value: 'USD',
      viewValue: 'USD',
    },

    {
      value: 'BTC',
      viewValue: 'Bitcoin',
    },
  ];

  // Get exchange by ID (USD,BTC)
  // exports.exchange = async ( id, params = { quotes: "USD" } ) => {
  //     return request( `/exchanges/${id}`, params );
  // };

  //   exports.today = async ( id = "btc-bitcoin", params = { quote: "USD" } ) => {
  //     return request( `/coins/${id}/ohlcv/today/`, params );
  // };

  // PATH PARAMETERS
  // coin_id
  // required
  // string
  // Example: btc-bitcoin
  // QUERY PARAMETERS
  // quote
  // string
  // Default: "usd"
  // returned data quote (available values: usd btc)

  private getbitCoinData(
    formData: bitCoinFormData
  ): Observable<IcoinApiResponse[]> {
    const { bitCoinType, exchangeCurrencyType } = formData;
    const params: HttpParams = new HttpParams().set(
      'quote',
      exchangeCurrencyType
    );

    this.formData = formData;

    return this.httpService
      .get<IcoinApiResponse[]>(
        `https://api.coinpaprika.com/v1/coins/${bitCoinType}/ohlcv/today`,
        { params: params }
      )
      .pipe(
        take(1),
        tap((value) => this.coinDataStream$.next(value)),
        tap(() => this.timeOfData$.next(new Date()))
      );
  }

  getData(formData: bitCoinFormData): Observable<number> {
    return timer(0, 20000).pipe(
      debounceTime(1000),
      switchMap((value) => of(value)),
      tap(() => this.getbitCoinData(formData).subscribe()),
      tap((value) => console.log(value)),
      tap(() => console.log(formData)),
      // tap((value) => this.coinDataStream$.next(value)),
      map((value) => value)
    );
  }

  getFreshCoinData() {
    this.refreshCrytoData$.next('ok');
    this.getData(this.formData).subscribe();
    this.refreshCrytoData$.complete();
    // combineLatest([
    //   this.coinService.coinDataStream$,
    //   this.coinService.refreshCrytoData$,
    // ])
    //   .pipe(tap((value) => console.log(value)))
    //   .subscribe();
  }

  getBitCoinList() {
    return of(this.availabaleBitCoins);
  }

  getCurrencyList() {
    return of(this.exchangeCurrencyList);
  }
}
