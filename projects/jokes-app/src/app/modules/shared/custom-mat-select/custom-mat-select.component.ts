import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'custom-mat-select',
  templateUrl: './custom-mat-select.component.html',
  styleUrls: ['./custom-mat-select.component.scss'],
})
export class CustomMatSelectComponent implements OnInit {
  @Input() control!: FormControl;
  @Input() selectValues!: any[];
  @Input() inputLabel?: string;
  @Input() placeHolder?: string;
  @Input() type?: string;
  @Input() name!: string;

  constructor() {}

  ngOnInit(): void {}
}
