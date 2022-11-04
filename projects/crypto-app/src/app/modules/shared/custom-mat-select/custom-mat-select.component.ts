import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

export interface IselectType {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'custom-mat-select',
  templateUrl: './custom-mat-select.component.html',
  styleUrls: ['./custom-mat-select.component.scss'],
})
export class CustomMatSelectComponent implements OnInit {
  @Input() control!: FormControl;
  @Input() selectValues!: IselectType[];
  @Input() label?: string;
  @Input() placeHolder?: string;
  @Input() type?: string;
  @Input() name!: string;
  @Input() multiple?: boolean = false;

  constructor() {}

  ngOnInit(): void {}
}
