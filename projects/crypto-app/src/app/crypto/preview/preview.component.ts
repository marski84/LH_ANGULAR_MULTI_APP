import { Component, Input, OnInit } from '@angular/core';
import { IcoinApiResponse } from '../models/coinApiResponse.interface';

@Component({
  selector: 'preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss'],
})
export class PreviewComponent implements OnInit {
  @Input() data!: any;

  constructor() {}

  ngOnInit(): void {
    console.log(this.data);
  }
}
