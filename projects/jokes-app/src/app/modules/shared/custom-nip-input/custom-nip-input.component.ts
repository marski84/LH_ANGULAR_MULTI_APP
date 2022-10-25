import { Component, forwardRef, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  ControlValueAccessor,
  FormControl,
  FormGroup,
} from '@angular/forms';

@Component({
  selector: 'custom-nip-input',
  templateUrl: './custom-nip-input.component.html',
  styleUrls: ['./custom-nip-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => CustomNipInputComponent),
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: forwardRef(() => CustomNipInputComponent),
    },
  ],
})
export class CustomNipInputComponent implements OnInit, ControlValueAccessor {
  constructor(private fb: FormBuilder) {}

  nipNumber = this.fb.group({ value: '11' });

  nipValue = '';
  onChange = (value: string) => {};
  onTouched = () => {};
  disabled: boolean = false;

  // get customNipNumberCtrl() {
  //   return this.nipNumber;
  // }

  writeValue(value: any): void {
    // this.nipValue = value;
    // value = value ?? undefined;
    // value ? this.nipNumber.setValue(value) : '';
    if (value) {
      this.nipNumber.setValue(value);
    }
  }

  registerOnChange(fn: any): void {
    // this.onChange = fn;
    this.nipNumber.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: any): void {
    // this.onTouched = fn;
    this.nipNumber.valueChanges.subscribe(fn);
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onInput(inputValue: string) {
    console.log(inputValue);
    this.onTouched();
    if (inputValue.length >= 2) {
    }
  }

  ngOnInit(): void {}
}
