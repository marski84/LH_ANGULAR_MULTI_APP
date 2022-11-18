import { Injectable, OnInit, OnDestroy } from '@angular/core';
import {
  HttpClient,
  HttpParams,
  HttpErrorResponse,
} from '@angular/common/http';
import {
  map,
  Observable,
  of,
  timer,
  ReplaySubject,
  tap,
  combineLatest,
  catchError,
  retry,
} from 'rxjs';
import { IselectValue } from './models/selectValue.interface';
import { IcoinApiResponse } from './models/coinApiResponse.interface';
import { bitCoinFormData } from './models/bitCoinFormData.interface';
import { Subject, switchMap, Subscription } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { apiResponse } from './models/apiResponse.interface';
import { IqueryData } from './models/queryData.interface';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalComponent } from './modal/modal.component';

@Injectable({
  providedIn: 'root',
})
export class CoinService implements OnInit, OnDestroy {
  coinDataStream$: Subject<IcoinApiResponse> = new Subject<IcoinApiResponse>();

  refreshCrytoData$: ReplaySubject<IqueryData> =
    new ReplaySubject<IqueryData>();

  private onDestroy$: Subject<void> = new Subject<void>();

  timer$!: Subscription;

  constructor(private httpService: HttpClient, private dialog: MatDialog) {}
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

  getbitCoinDataFromApi(formData: IqueryData) {
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
        retry(3),
        map((response) => this.createResponseObject(response)),
        tap((value) => this.coinDataStream$.next(value)),
        catchError((error: HttpErrorResponse) => {
          this.handleErrorModal(error);
          return of(error);
        })
      )
      .subscribe();
  }

  private createResponseObject(response: apiResponse[]) {
    return new Object({
      coinData: response[0],
      timeStamp: new Date(),
    }) as IcoinApiResponse;
  }

  handleStreamSubscription(queryData: IqueryData) {
    if (this.timer$) {
      console.log('unsub');
      this.timer$.unsubscribe();
    }

    this.timer$ = timer(0, 20000)
      .pipe(tap(() => this.getbitCoinDataFromApi(queryData)))
      .subscribe();
  }

  private handleErrorModal(errorData: any) {
    const dialogConf: MatDialogConfig = {
      width: '400px',
      height: '400px',
      hasBackdrop: true,
      disableClose: false,
      data: errorData,
    };

    this.dialog.open(ModalComponent, dialogConf);
  }

  getBitCoinList() {
    return of(this.availabaleBitCoins);
  }

  getCurrencyList() {
    return of(this.exchangeCurrencyList);
  }
}
