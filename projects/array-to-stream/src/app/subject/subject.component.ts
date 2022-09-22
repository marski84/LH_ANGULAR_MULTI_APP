import { AjaxResponse } from 'rxjs/ajax';
import { PostalService } from './postal.service';
import { Component, OnInit } from '@angular/core';
import {
  tap,
  concatMap,
  catchError,
  of,
  throwError,
  map,
  filter,
  Observable,
} from 'rxjs';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss'],
})
export class SubjectComponent implements OnInit {
  postalCodeData: any[] = []; // postalCode + tablica places( sama nazwa miejsca )

  constructor(private postalService: PostalService) {}

  ngOnInit(): void {
    this.postalService.postalCodeEmitted$.pipe(
      tap((value) => console.log(value))
    );
    // .subscribe();

    this.postalService.postalCodeEmitted$
      .pipe(
        concatMap((postalCode) => {
          return this.postalService.getPostalCodeDetails(postalCode);
        }),
        catchError((err: HttpErrorResponse) => throwError(err)),
        tap((err: any) => this.postalService.apiError$.next(err)),
        filter((response: AjaxResponse<Object>) => response.status === 200)
      )
      .subscribe((response) =>
        this.postalService.newPostalDataAppears$.next(response.response)
      );

    this.postalService.newPostalDataAppears$.subscribe((data) =>
      this.postalCodeData.push(data)
    );

    this.postalService.apiError$.subscribe((value) =>
      console.log('err: ' + value)
    );

    console.log(this.postalCodeData);
  }
}
