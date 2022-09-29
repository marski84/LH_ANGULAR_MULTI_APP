import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MessageService } from './message.service';
import { map, tap } from 'rxjs';
import { IAccountRecord } from './IAccountRecord';

export interface ILoanRecord {
  amount: number;
  forPayment: number;
}

@Component({
  selector: 'app-message-stream',
  templateUrl: './message-stream.component.html',
  styleUrls: ['./message-stream.component.scss'],
})
export class MessageStreamComponent implements OnInit, OnDestroy {
  constructor(private messageService: MessageService) {}

  dataMessages: Subscription[] = [];

  income$ = this.messageService.incomeMessages$.pipe(
    tap((value) => (this.messageService.changeAccountBalance = value.amount)),
    map((value) => this.handleIncome(value)),
    tap((value) => console.log(value))
  );

  outcome$ = this.messageService.outcomeMessages$.pipe(
    // tap((value) => (this.messageService.changeAccountBalance = -value.amount)),
    map((value) => this.handleOutCome(value)),
    tap((value) => console.log(value))
  );

  ngOnInit(): void {
    this.dataMessages.push(this.income$.subscribe());
    this.dataMessages.push(this.outcome$.subscribe());
  }

  ngOnDestroy(): void {
    this.dataMessages.forEach((sub) => sub.unsubscribe());
  }

  private handleOutCome(value: IAccountRecord) {
    const { id, type, amount } = value;

    this.messageService.changeAccountBalance = -amount;

    if (this.messageService.accountValue - amount < 0) {
      const newBalance = amount + this.messageService.accountValue;
      console.log(amount, newBalance, this.messageService.accountValue);

      this.messageService.changeAccountBalance =
        this.messageService.accountValue + amount;

      // this.messageService.changeAccountBalance = newBalance;
      //   this.messageService.accountValue + amount;

      const loan = {
        amount: amount,
        forPayment: id,
      };
      this.messageService.loansBalance.push(loan);

      const logger = {
        id: id,
        outcome: amount,
        total: this.messageService.accountValue,
      };
      return logger;
    }

    const logger = {
      id: id,
      outcome: amount,
      total: this.messageService.accountValue,
    };

    console.log('wtf');

    this.messageService.changeAccountBalance = amount;
    return logger;
  }

  private handleIncome(value: IAccountRecord) {
    const { id, type, amount } = value;

    const logger = {
      id: id,
      income: amount,
      total: this.messageService.accountValue,
    };
    return logger;
  }
}
