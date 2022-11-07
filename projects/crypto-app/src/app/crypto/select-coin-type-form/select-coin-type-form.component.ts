import { Component, OnInit } from '@angular/core';
import { Subscription, tap } from 'rxjs';
import { CoinService } from '../coin.service';
import { IselectValue } from '../models/selectValue.interface';
import { FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-select-coin-type-form',
  templateUrl: './select-coin-type-form.component.html',
  styleUrls: ['./select-coin-type-form.component.scss'],
})
export class SelectCoinTypeFormComponent implements OnInit {
  constructor(private coinService: CoinService, private fb: FormBuilder) {}

  bitCoinList!: IselectValue[];
  currencyList!: IselectValue[];

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

    this.coinService.getbitCoinData(this.bitCoinForm.value).subscribe();
  }

  handleSubmit(value: any) {
    console.log(value);
  }
}
