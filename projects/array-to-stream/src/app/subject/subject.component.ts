import { AjaxError, AjaxResponse } from 'rxjs/ajax';
import { PostalService } from './postal.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  tap,
  concatMap,
  catchError,
  of,
  throwError,
  map,
  filter,
  Observable,
  EMPTY,
} from 'rxjs';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss'],
})
export class SubjectComponent implements OnInit, OnDestroy {
  postalCodeData: any[] = []; // postalCode + tablica places( sama nazwa miejsca )

  onDestroy$: Subject<void> = new Subject();

  constructor(private postalService: PostalService) {}

  ngOnInit(): void {
    this.postalService
      .getData()
      .pipe()
      .subscribe((response) =>
        this.postalService.newPostalDataAppears$.next(response)
      );

    this.postalService.newPostalDataAppears$
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((data) => this.postalCodeData.push(data));

    this.postalService.apiError$
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((value) => console.log('err: ' + value));

    console.log(this.postalCodeData);
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
