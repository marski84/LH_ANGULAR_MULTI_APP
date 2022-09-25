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

  arrayStream$ = from(this._array).pipe(
    concatMap((value) => of(value).pipe(delay(2000)))
  );

  constructor() {}
}
