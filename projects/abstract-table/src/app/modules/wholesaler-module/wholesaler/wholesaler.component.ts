import {
  AfterContentInit,
  Component,
  ContentChild,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-wholesaler-module',
  templateUrl: './wholesaler.component.html',
  styleUrls: ['./wholesaler.component.css'],
})
export class WholesalerComponent implements OnInit, AfterContentInit {
  constructor() {}

  ngOnInit() {
    console.log('działam');
  }

  ngAfterContentInit(): void {}
}
