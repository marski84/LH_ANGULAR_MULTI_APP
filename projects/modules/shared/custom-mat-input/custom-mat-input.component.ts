import { FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
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
export class CustomMatInputComponent implements OnInit {
  @Input() control!: FormControl;
  @Input() inputLabel?: string;
  @Input() placeHolder?: string;
  @Input() type?: string;
  @Input() name!: string;
  @Input() isNipControl?: boolean;

  @ViewChild('input') input!: ElementRef;

  constructor() {}

  ngOnInit(): void {}
}
