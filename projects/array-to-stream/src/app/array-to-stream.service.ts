import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import {
  debounceTime,
  skip,
  tap,
  finalize,
  switchMap,
  mergeMap,
  concatMap,
} from 'rxjs';
import {
  Subject,
  EMPTY,
  ReplaySubject,
  Observable,
  from,
  delay,
  map,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ArrayToStreamService {
  private _array = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];

  arrayStreamEmitted$ = from(this._array);

  // arrayStream$: Observable<string> = new Observable((observer) => {
  //   this._array.forEach((record: string, index: number) => {
  //     setTimeout(() => {
  //       observer.next(record), observer.next(record.toUpperCase());
  //       // if (index === this._array.length - 1) {
  //       //   observer.complete();
  //       //   console.log('ok');
  //       // }
  //     }, 2000);
  //   });

  // });

  //https://www.google.com/search?q=rxjs+delay+each+emission&oq=rxjs+delay+eacg&aqs=chrome.1.69i57j0i13i19j0i19i22i30j0i8i13i19i30.7415j0j7&sourceid=chrome&ie=UTF-8

  constructor() {}
}
