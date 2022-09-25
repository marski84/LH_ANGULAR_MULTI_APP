import { Injectable } from '@angular/core';
import {
  zip,
  tap,
  share,
  concatMap,
  of,
  delay,
  finalize,
  from,
  filter,
  interval,
  takeLast,
} from 'rxjs';
import { IAccountRecord } from './IAccountRecord';
import { ILoanRecord } from './message-stream.component';
import { take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private _array = [
    {
      id: 1,
      type: 'income',
      amount: 100,
    },
    {
      id: 2,
      type: 'income',
      amount: 100,
    },
    {
      id: 3,
      type: 'outcome',
      amount: 100,
    },
    {
      id: 5,
      type: 'outcome',
      amount: 500,
    },
    {
      id: 6,
      type: 'outcome',
      amount: 100,
    },
    {
      id: 7,
      type: 'income',
      amount: 100,
    },
  ];

  private _loans: ILoanRecord[] = [];
  private _accountBalance: number = 0;

  set changeAccountBalance(value: number) {
    this._accountBalance = this._accountBalance + value;
  }

  get accountValue() {
    return this._accountBalance;
  }

  get loansBalance() {
    return this._loans;
  }

  private source$ = from(this._array);
  private timer = interval(1000);

  private sourceWithZip$ = zip(this.source$, this.timer).pipe(
    tap((value) => console.log(value))
  );

  _paymentsMessages$ = this.source$.pipe(
    concatMap((value) => of(value).pipe(delay(2000))),
    share(),
    // takeLast(1),
    finalize(() => {
      console.log('emission finished');
      console.log('final account balance: ' + this.accountValue);
      console.log(
        'loans: ' + this.loansBalance.forEach((loan) => console.log(loan))
      );
    })
  );

  incomeMessages$ = this._paymentsMessages$.pipe(
    filter((value: IAccountRecord) => value.type === 'income')
  );

  outcomeMessages$ = this._paymentsMessages$.pipe(
    filter((value: IAccountRecord) => value.type === 'outcome')
  );

  constructor() {}
}
