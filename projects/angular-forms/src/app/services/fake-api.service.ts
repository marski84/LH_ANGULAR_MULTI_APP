import { IAccountType } from './../models/IAccountType';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FakeApiService {
  private _typeOfContactData: IAccountType[] = [
    { value: 'person', viewValue: 'Personal account' },
    { value: 'company', viewValue: 'Business account' },
  ];

  constructor() {}

  getTypeOfContactDictionary() {
    return of(this._typeOfContactData);
  }
}
