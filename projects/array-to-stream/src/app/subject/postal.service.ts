import { Injectable } from '@angular/core';
import { Subject, map, catchError, of, tap, Observable, from } from 'rxjs';
import { ajax, AjaxResponse } from 'rxjs/ajax';
import { HttpErrorResponse } from '@angular/common/http';

export interface apiResponse {
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
  response: {
    postId: number;
    id: number;
    name: string;
    email: string;
    body: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class PostalService {
  private _apiKey = 'a4572c40-390d-11ed-bed6-237de0d22469';

  // private _postalCodes = [
  //   '90210',
  //   '33162',
  //   'I will crush your plan :)',
  //   '33163',
  // ];
  private _postalCodes = ['1', '2', 'I will crush your plan :)', '500'];
  newPostalDataAppears$: Subject<Object> = new Subject();
  apiError$: Subject<HttpErrorResponse> = new Subject();

  postalCodeEmitted$ = from(this._postalCodes);

  constructor() {}

  getPostalCodeDetails(postalCode: string): Observable<Object> {
    // const endpoint = `https://app.zipcodebase.com/api/v1/search?codes=${postalCode}`;
    const endpoint = `https://jsonplaceholder.typicode.com/comments/${postalCode}`;

    return ajax({
      url: endpoint,
      method: 'GET',
      crossDomain: true,
      withCredentials: false,
      headers: {
        'Content-Type': 'application/json',
        apikey: 'a4572c40-390d-11ed-bed6-237de0d22469',
      },
    }).pipe(
      // map((response) => response),
      tap((response) => console.log(response)),
      catchError((err) => of(err))
    );
  }
}
