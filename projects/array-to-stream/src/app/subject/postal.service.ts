import { Injectable } from '@angular/core';
import {
  Subject,
  map,
  catchError,
  of,
  tap,
  Observable,
  from,
  throwError,
} from 'rxjs';
import { ajax, AjaxResponse } from 'rxjs/ajax';
import { HttpErrorResponse } from '@angular/common/http';
import { concatMap, EMPTY } from 'rxjs';

export interface apiResponse<T> {
  request: {
    async: boolean;
    crossDomain: boolean;
    withCredentials: boolean;
    method: string;
    timeout: number;
    responseType: string;
    url: string;
  };
  status: number;
  responseType: string;
  response: T;
}

export interface PostalModel {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

@Injectable({
  providedIn: 'root',
})
export class PostalService {
  private _postalCodes = ['1', '2', 'I will crush your plan :)', '500'];
  newPostalDataAppears$: Subject<any> = new Subject();
  apiError$: Subject<HttpErrorResponse> = new Subject();

  private postalCodeEmitted$ = from(this._postalCodes);

  constructor() {}

  private getPostalCodeDetails(postalCode: string): Observable<PostalModel> {
    const endpoint = `https://jsonplaceholder.typicode.com/comments/${postalCode}`;

    return ajax<PostalModel>({
      url: endpoint,
      method: 'GET',
      crossDomain: true,
      withCredentials: false,
      headers: {
        'Content-Type': 'application/json',
        apikey: 'a4572c40-390d-11ed-bed6-237de0d22469',
      },
    }).pipe(
      tap((response) => console.log(response)),
      map((respo) => respo.response),
      catchError((err) => this.handleError(err))
    );
  }

  getData() {
    return this.postalCodeEmitted$.pipe(
      concatMap((value) =>
        this.getPostalCodeDetails(value).pipe(catchError((err) => EMPTY))
      )
    );
  }

  private handleError(err: any) {
    this.apiError$.next(err);
    return throwError('invalid api request');
  }
}
