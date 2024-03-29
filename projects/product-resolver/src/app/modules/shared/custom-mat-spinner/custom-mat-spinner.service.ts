import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root',
})
export class CustomMatSpinnerService {
  private _isLoading = new BehaviorSubject<boolean>(false);
  isLoading$ = this._isLoading.asObservable();

  constructor() {}

  show() {
    this._isLoading.next(true);
  }

  hide() {
    this._isLoading.next(false);
  }
}
