import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CustomMatSpinnerService } from './custom-mat-spinner.service';

@Component({
  selector: 'app-custom-mat-spinner',
  templateUrl: './custom-mat-spinner.component.html',
  styleUrls: ['./custom-mat-spinner.component.scss'],
})
export class CustomMatSpinnerComponent implements OnInit {
  constructor(public loader: CustomMatSpinnerService) {}
  loading$ = this.loader.isLoading$;

  ngOnInit(): void {
    console.log('init');
  }
}
