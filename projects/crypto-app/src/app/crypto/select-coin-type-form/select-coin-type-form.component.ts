import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { combineLatest, debounceTime, tap } from 'rxjs';
import { CoinService } from '../coin.service';
import { IselectValue } from '../models/selectValue.interface';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { formDataTuple } from '../models/formDataTuple';

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

  @Output() coinFormDataEmitted: EventEmitter<formDataTuple> =
    new EventEmitter<formDataTuple>();

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

    this.initFormValueChangesListener();
  }

  private handleFormData(data: formDataTuple) {
    this.coinFormDataEmitted.emit(data);
  }

  private initFormValueChangesListener() {
    combineLatest([
      this.bitCoinTypeCtrl.valueChanges,
      this.exchangeCurrencyTypeCtrl.valueChanges,
    ])
      .pipe(
        debounceTime(2000),
        tap((value) => this.handleFormData(value))
      )
      .subscribe();
  }
}
