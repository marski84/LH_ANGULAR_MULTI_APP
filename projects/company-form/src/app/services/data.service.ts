import { Injectable } from '@angular/core';
import { of, first } from 'rxjs';

import { faker } from '@faker-js/faker';
import { Company } from '../models/Company';
import { Employee } from '../models/Employee';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private _typeOfBusinessSelectOptions = [
    {
      value: 'Sole proprietorship',
      viewValue: 'Sole proprietorship',
    },
    { value: 'Partnership', viewValue: 'Partnership' },
    {
      value: 'Limited liability company (LLC)',
      viewValue: 'Limited liability company (LLC)',
    },
    {
      value: 'Limited liability company (LLC)',
      viewValue: 'Limited liability company (LLC)',
    },
    { value: 'Corporation - C corp', viewValue: 'Corporation - C corp' },
    { value: 'Corporation - S corp', viewValue: 'Corporation - S corp' },
    { value: 'Corporation - B corp', viewValue: 'Corporation - B corp' },
    { value: 'Corporation - nonprofit', viewValue: 'Corporation - nonprofit' },
  ];

  first = new Company('firstOne', 'Partnership', [
    new Employee('second', 'secondary', 29),
    new Employee('fdsg', 'fd', 30),
  ]);

  second = new Company('second', 'Partnership', [
    new Employee('second', 'secondary', 40),
    new Employee('hiper', 'piper', 20),
  ]);

  third = new Company('third', 'Partnership', [
    new Employee('super', 'duper', 40),
    new Employee('hiper', 'piper', 20),
  ]);

  companyList = [this.first, this.second, this.third];

  constructor() {
    this.companyList[0].id = '9b6cfe23-d0c3-45fc-a631-e51a678ef9f3';
    this.companyList[1].id = '04a07ef-b341-418d-9798-2606344e8e91';
    this.companyList[2].id = '5a368acb-8ec3-4517-815f-77f5c8530f29';
  }

  get typeOfBusiness() {
    return of(this._typeOfBusinessSelectOptions);
  }
}
