import { Component, OnInit, OnDestroy } from '@angular/core';
import { concat, concatMap, mergeMap, Subscription } from 'rxjs';
import { MessageService } from './message.service';
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
import { IAccountRecord } from './IAccountRecord';

interface ILoanRecord {
  amount: number;
  forPayment: number;
}

@Component({
  selector: 'app-message-stream',
  templateUrl: './message-stream.component.html',
  styleUrls: ['./message-stream.component.scss'],
})
export class MessageStreamComponent implements OnInit, OnDestroy {
  accountValue = 0;
  loans: ILoanRecord[] = [];

  constructor(private messageService: MessageService) {}

  dataMessages: Subscription[] = [];

  income = this.messageService.incomeMessages$.pipe(
    tap((value) => (this.accountValue = this.accountValue + value.amount)),
    map((value) => this.handleIncome(value)),
    tap((value) => console.log(value))
  );

  outcome = this.messageService.outcomeMessages$.pipe(
    tap((value) => (this.accountValue = this.accountValue + value.amount)),
    map((value) => this.handleOutCome(value)),
    tap((value) => console.log(value)),
    finalize(() => {
      console.log('Finished, account balance: ' + this.accountValue),
        this.loans.forEach((loan) =>
          console.log(
            'loan amount: ' + loan.amount,
            'loan id: ' + loan.forPayment
          )
        );
    })
  );

  ngOnInit(): void {
    // this.dataMessages.push(this.income.subscribe());
    // this.dataMessages.push(this.outcome.subscribe());
  }

  ngOnDestroy(): void {
    this.dataMessages.forEach((sub) => sub.unsubscribe());
  }

  private handleOutCome(value: IAccountRecord) {
    const { id, type, amount } = value;

    const logger = {
      id: id,
      outcome: amount,
      total: this.accountValue,
    };

    const loan = {
      amount: amount,
      forPayment: id,
    };
    this.loans.push(loan);

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
}
