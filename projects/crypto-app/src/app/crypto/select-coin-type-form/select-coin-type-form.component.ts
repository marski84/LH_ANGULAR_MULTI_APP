import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { combineLatest, debounceTime, map, tap } from 'rxjs';
import { CoinService } from '../coin.service';
import { IselectValue } from '../models/selectValue.interface';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { formDataTuple } from '../models/formDataTuple';
import { IqueryData } from '../models/queryData.interface';

@Component({
  selector: 'app-select-coin-type-form',
  templateUrl: './select-coin-type-form.component.html',
  styleUrls: ['./select-coin-type-form.component.scss'],
})
export class SelectCoinTypeFormComponent implements OnInit {
  bitCoinList!: IselectValue[];
  currencyList!: IselectValue[];

  bitCoinForm = this.fb.group({
    bitCoinType: ['', Validators.required],
    exchangeCurrencyType: ['', Validators.required],
  });

  @Output() coinFormDataEmitted: EventEmitter<IqueryData> =
    new EventEmitter<IqueryData>();

  get bitCoinTypeCtrl() {
    return this.bitCoinForm.get('bitCoinType') as FormControl;
  }

  get exchangeCurrencyTypeCtrl() {
    return this.bitCoinForm.get('exchangeCurrencyType') as FormControl;
  }

  constructor(private coinService: CoinService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.coinService
      .getBitCoinList()
      .pipe(tap((bitCoinList) => (this.bitCoinList = bitCoinList)))
      .subscribe();

    this.coinService
      .getCurrencyList()
      .pipe(tap((currencyList) => (this.currencyList = currencyList)))
      .subscribe();

    combineLatest([
      this.bitCoinTypeCtrl.valueChanges,
      this.exchangeCurrencyTypeCtrl.valueChanges,
    ])
      .pipe(
        // debounceTime(2000),
        map((value) => this.handleQueryFormat(value)),
        tap((value) => this.coinFormDataEmitted.emit(value))
      )
      .subscribe();
  }

  private handleQueryFormat(data: formDataTuple): IqueryData {
    const queryData = {
      bitCoinType: data[0],
      exchangeCurrencyType: data[1],
    };
    return queryData;
  }
}
