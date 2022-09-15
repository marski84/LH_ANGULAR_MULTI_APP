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

interface ILoanRecord {
  amount: number;
  forPayment: number;
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
  loans: ILoanRecord[] = [];

  sourceWithZip$ = zip(this.source$, this.timer).pipe(
    tap((value) => console.log(value)),
    share()
  );

  sourceWithConcatMap$ = this.source$.pipe(
    concatMap((value) => of(value).pipe(delay(2000))),
    // tap((value: any) => console.log(value))
    finalize(() => console.log(this.loans))
  );

  // firstIncomeStream$ = this.sourceWithZip$.pipe(
  //   filter((value) => value[0].type === 'income')
  // );

  secondIncomeStream$ = this.sourceWithConcatMap$.pipe(
    filter((value) => value.type === 'income'),
    mergeMap((value) =>
      concat(
        of(value).pipe(
          map((value) => (this.accountValue = this.accountValue + value.amount))
        ),
        of(value)
          .pipe(map((value) => this.handleIncome(value)))
          .pipe(tap((value) => console.log(value)))
      )
    )
  );

  outcomeStream$ = this.sourceWithConcatMap$.pipe(
    filter((value) => value.type === 'outcome'),
    mergeMap((value) =>
      concat(
        of(value).pipe(
          map((value) => (this.accountValue = this.accountValue - value.amount))
        ),
        of(value)
          .pipe(map((value) => this.handleOutCome(value)))
          .pipe(tap((value) => console.log(value)))
      )
    )
  );

  private handleOutCome(value: IAccountRecord) {
    const { id, type, amount } = value;

    const logger = {
      id: id,
      outcome: amount,
      total: this.accountValue,
    };

    if (this.accountValue < 0) {
      const loan = {
        amount: amount,
        forPayment: id,
      };
      this.loans.push(loan);
    }

    return logger;
  }

  private handleIncome(value: IAccountRecord) {
    const { id, type, amount } = value;

    const logger = {
      id: id,
      income: amount,
      total: this.accountValue,
    };
    return logger;
  }

  constructor() {}

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
