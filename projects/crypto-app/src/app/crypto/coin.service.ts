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
} from 'rxjs';
import { IselectValue } from './models/selectValue.interface';
import { IcoinApiResponse } from './models/coinApiResponse.interface';
import { bitCoinFormData } from './models/bitCoinFormData.interface';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CoinService {
  // https://api.kucoin.com/api/v1/market/stats?symbol=BTC-USDT

  // currencyList
  // https://api.kucoin.com/api/v2/symbols

  constructor(private httpService: HttpClient) {}

  coinDataStream$: Subject<any> = new Subject<IcoinApiResponse>();

  refreshCrytoData$: ReplaySubject<any> = new ReplaySubject<IcoinApiResponse>();

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
  ): Observable<IcoinApiResponse> {
    const { bitCoinType, exchangeCurrencyType } = formData;
    const params: HttpParams = new HttpParams().set(
      'quote',
      exchangeCurrencyType
    );

    return this.httpService
      .get<IcoinApiResponse>(
        `https://api.coinpaprika.com/v1/coins/${bitCoinType}/ohlcv/today`,
        { params: params }
      )
      .pipe(
        take(1),
        tap((value) => this.coinDataStream$.next(value))
      );
  }

  getData(formData: bitCoinFormData): Observable<number> {
    return timer(0, 5000).pipe(
      tap(() => this.getbitCoinData(formData)),
      tap((value) => console.log(value)),
      tap(() => console.log(formData)),
      tap((value) => this.coinDataStream$.next(value)),
      map((value) => value)
    );
  }

  getFreshCoinData(formData: bitCoinFormData) {
    // const actualData = this.getbitCoinData(formData)
    // this.getData(formData);
    this.refreshCrytoData$.next('ok');
    this.refreshCrytoData$.complete();
  }

  getBitCoinList() {
    return of(this.availabaleBitCoins);
  }

  getCurrencyList() {
    return of(this.exchangeCurrencyList);
  }
}
