import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

interface ISelectValue {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'custom-mat-radio',
  templateUrl: './custom-mat-radio.component.html',
  styleUrls: ['./custom-mat-radio.component.scss'],
})
export class CustomMatRadioComponent implements OnInit {
  constructor() {}

  @Input() selectValues!: ISelectValue[];
  @Input() control!: FormControl;
  @Input() label?: string;

  ngOnInit(): void {}
}
