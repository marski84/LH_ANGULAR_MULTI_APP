import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { debounceTime } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomMatSpinnerService {
  private _isLoading = new BehaviorSubject<boolean>(false);
  isLoading$ = this._isLoading.asObservable().pipe(debounceTime(500));

  constructor() {}

  show() {
    this._isLoading.next(true);
  }

  hide() {
    this._isLoading.next(false);
  }
}
