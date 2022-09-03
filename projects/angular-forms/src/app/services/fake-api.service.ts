import { IAccountType } from './../models/IAccountType';
import { of, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { IFormData } from '../models/IFormData';

@Injectable({
  providedIn: 'root',
})
export class FakeApiService {
  private _formDataSubject = new Subject<IFormData>();
  formData$ = this._formDataSubject.asObservable();

  private _typeOfContactData: IAccountType[] = [
    { value: 'person', viewValue: 'Personal account' },
    { value: 'company', viewValue: 'Business account' },
  ];

  constructor() {}

  getTypeOfContactDictionary() {
    return of(this._typeOfContactData);
  }

  sendFormData(formData: IFormData) {
    this._formDataSubject.next(formData);
  }
}
