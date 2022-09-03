import {
  AbstractControl,
  FormControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
  Validators,
} from '@angular/forms';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'custom-mat-input',
  templateUrl: './custom-mat-input.component.html',
  styleUrls: ['./custom-mat-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: CustomMatInputComponent,
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: CustomMatInputComponent,
    },
  ],
})
export class CustomMatInputComponent implements OnInit, Validator {
  @Input() control!: FormControl;
  @Input() inputLabel?: string;
  @Input() placeHolder?: string;
  @Input() type?: string;
  @Input() name!: string;
  @Input() isNipControl?: boolean;

  @ViewChild('input') input!: ElementRef;

  disabled: boolean = false;

  constructor() {}

  ngOnInit(): void {
    console.log(this.isNipControl);
  }

  onChange: (value: any) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(value: any): void {
    this.input.nativeElement.value = value;
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
  }

  validate(control: AbstractControl): ValidationErrors | null {
    if (this.isNipControl) {
      const nipValue = control.value;
      console.log(nipValue);
      return {
        ok: 'ok',
      };
    }
    return Validators.required(control);
  }
}
