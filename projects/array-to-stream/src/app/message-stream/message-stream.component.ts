import { Component, OnInit } from '@angular/core';
import { concat, concatMap, mergeMap } from 'rxjs';
import {
  delay,
  filter,
  finalize,
  from,
  interval,
  map,
  of,
  share,
  tap,
  zip,
} from 'rxjs';

interface IAccountRecord {
  id: number;
  type: string;
  amount: number;
}

@Component({
  selector: 'app-message-stream',
  templateUrl: './message-stream.component.html',
  styleUrls: ['./message-stream.component.scss'],
})
export class MessageStreamComponent implements OnInit {
  array = [
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

  timer = interval(1000);
  source$ = from(this.array);

  accountValue = 0;
  loans = [];

  sourceWithZip$ = zip(this.source$, this.timer).pipe(
    tap((value) => console.log(value)),
    share()
  );

  sourceWithConcatMap$ = this.source$.pipe(
    concatMap((value) => of(value).pipe(delay(2000))),
    // tap((value: any) => console.log(value))
    finalize(() => console.log('valueAmount na koniec: ' + this.accountValue))
  );

  // firstIncomeStream$ = this.sourceWithZip$.pipe(
  //   filter((value) => value[0].type === 'income')
  // );

  secondIncomeStream$ = this.sourceWithConcatMap$.pipe(
    filter((value) => value.type === 'income'),
    mergeMap((value) =>
      concat(
        of(value).pipe(
          map(
            (value) => (this.accountValue = this.accountValue + value.amount)
          ),
          tap(() => console.log(this.accountValue))
        ),
        of(value).pipe(
          tap((value) =>
            console.log(
              this.createLogObject(value.id, value.amount, this.accountValue)
            )
          )
        )
      )
    )
  );

  outcomeStream$ = this.sourceWithConcatMap$.pipe(
    filter((value) => value.type === 'outcome'),
    mergeMap((value) =>
      concat(
        of(value).pipe(
          map(
            (value) => (this.accountValue = this.accountValue - value.amount)
          ),
          tap(() => console.log(this.accountValue))
        ),
        of(value).pipe(
          tap((value) =>
            console.log(
              this.createLogObject(value.id, value.amount, this.accountValue)
            )
          )
        )
      )
    )
  );

  private createLogObject(id: any, incomeAmount: any, total: any) {
    const logger = {
      id: id,
      income: incomeAmount,
      total: total,
    };
    return logger;
  }

  // private handleAccountChange(value: IAccountRecord) {
  //   from(value).mergeMap((value) =>
  //     concat(
  //       of(value).pipe(
  //         map(
  //           (value) => (this.accountValue = this.accountValue + value.amount)
  //         ),
  //         tap(() => console.log(this.accountValue))
  //       ),
  //       of(value).pipe(
  //         tap((value) =>
  //           console.log(
  //             this.createLogObject(value.id, value.amount, this.accountValue)
  //           )
  //         )
  //       )
  //     )
  //   );
  // }

  constructor() {}

  // symulacja wyniku:
  // id: 1. income: 100, total: 0
  // id: 2. income: 100, total: 100
  // id: 3. outcome: 100, total: 200
  // id: 5. outcome: 500, total: 100
  // id: 6. outcome: 100, total: 100
  // id: 7. income: 100, total: 0
  // 100 [ { amount: 500, forPayment: 5 } ]

  ngOnInit(): void {
    // this.sourceWithZip$.subscribe();

    this.secondIncomeStream$
      .pipe(finalize(() => console.log(this.accountValue)))
      .subscribe();

    this.outcomeStream$
      .pipe(finalize(() => console.log(this.accountValue)))
      .subscribe();
  }
}
