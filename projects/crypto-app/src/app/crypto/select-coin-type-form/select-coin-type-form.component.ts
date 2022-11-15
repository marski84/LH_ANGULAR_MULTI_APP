import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { combineLatest, Subscription, tap } from 'rxjs';
import { CoinService } from '../coin.service';
import { IselectValue } from '../models/selectValue.interface';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { bitCoinFormData } from '../models/bitCoinFormData.interface';

@Component({
  selector: 'app-select-coin-type-form',
  templateUrl: './select-coin-type-form.component.html',
  styleUrls: ['./select-coin-type-form.component.scss'],
})
export class SelectCoinTypeFormComponent implements OnInit {
  coinDataReceiver: any;
  constructor(private coinService: CoinService, private fb: FormBuilder) {}

  @Output() coinFormDataEmitted: EventEmitter<any> = new EventEmitter<any>();

  bitCoinList!: IselectValue[];
  currencyList!: IselectValue[];

  bitCoinStreamSubscription$!: Subscription;

  bitCoinForm = this.fb.group({
    bitCoinType: ['', Validators.required],
    exchangeCurrencyType: ['', Validators.required],
  });

  get bitCoinTypeCtrl() {
    return this.bitCoinForm.get('bitCoinType') as FormControl;
  }

  get exchangeCurrencyTypeCtrl() {
    return this.bitCoinForm.get('exchangeCurrencyType') as FormControl;
  }

  ngOnInit(): void {
    this.coinService
      .getBitCoinList()
      .pipe(tap((bitCoinList) => (this.bitCoinList = bitCoinList)))
      .subscribe();

    this.coinService
      .getCurrencyList()
      .pipe(tap((currencyList) => (this.currencyList = currencyList)))
      .subscribe();

    this.bitCoinTypeCtrl.setValue(this.bitCoinList[0].value);
    this.exchangeCurrencyTypeCtrl.setValue(this.currencyList[0].value);

    this.bitCoinTypeCtrl.valueChanges
      .pipe(tap((value: string) => this.handleBitCoinTypeChange(value)))
      .subscribe();

    this.exchangeCurrencyTypeCtrl.valueChanges
      .pipe(tap((value: string) => this.handleExchangeCurrencyChange(value)))
      .subscribe();

    // combineLatest([
    //   this.coinService.coinDataStream$,
    //   this.coinService.refreshCrytoData$,
    // ])
    //   .pipe(tap((value) => console.log(value)))
    //   .subscribe();
  }

  handleSubmit(value: any) {
    console.log(value);
  }

  private handleBitCoinTypeChange(value: string) {
    this.bitCoinForm.value.bitCoinType = value;
    this.coinFormDataEmitted.emit(this.bitCoinForm.value);
  }

  private handleExchangeCurrencyChange(value: string) {
    this.bitCoinForm.value.exchangeCurrencyType = value;
    this.coinFormDataEmitted.emit(this.bitCoinForm.value);
  }
}
