import { FormControl } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'custom-mat-input',
  templateUrl: './custom-mat-input.component.html',
  styleUrls: ['./custom-mat-input.component.scss'],
})
export class CustomMatInputComponent implements OnInit {
  @Input() control!: FormControl;
  @Input() inputLabel?: string;
  @Input() placeHolder?: string;
  @Input() type?: string;
  @Input() name!: string;

  constructor() {}

  ngOnInit(): void {}
}
