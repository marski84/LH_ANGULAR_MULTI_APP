import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CoinService {
  // https://api.kucoin.com/api/v1/market/stats?symbol=BTC-USDT

  // currencyList
  // https://api.kucoin.com/api/v2/symbols

  constructor(private httpService: HttpClient) {}

  getCurrencyList() {
    return this.httpService.get('https://api.kucoin.com/api/v2/symbols').pipe(
      take(10),
      map((currencyList) => currencyList)
    );
  }

  getCurrencyData() {
    return this.httpService.get(
      'https://api.kucoin.com/api/v1/market/stats?symbol=BTC-USDT'
    );
  }
}
