import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Company } from './models/Company';
import { Employee } from './models/Employee';

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

  constructor() {}

  get typeOfBusiness() {
    return of(this._typeOfBusinessSelectOptions);
  }
}
