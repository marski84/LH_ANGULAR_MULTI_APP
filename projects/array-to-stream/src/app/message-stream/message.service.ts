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
} from 'rxjs';
import { IAccountRecord } from './IAccountRecord';

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

  source$ = from(this._array);
  timer = interval(1000);

  sourceWithZip$ = zip(this.source$, this.timer).pipe(
    tap((value) => console.log(value)),
    share()
  );

  private _paymentsMessages$ = this.source$.pipe(
    concatMap((value) => of(value).pipe(delay(2000)))
  );

  constructor() {}

  incomeMessages$ = this._paymentsMessages$.pipe(
    filter((value: IAccountRecord) => value.type === 'income')
  );

  outcomeMessages$ = this._paymentsMessages$.pipe(
    filter((value: IAccountRecord) => value.type === 'outcome')
  );
}
