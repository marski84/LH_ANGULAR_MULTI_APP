import { Injectable } from '@angular/core';
import { map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DictionaryServiceService {
  private formFields = [
    {
      dataKey: 'id',
    },
    {
      dataKey: 'title',
    },
    {
      dataKey: 'price',
    },
    {
      dataKey: 'description',
    },
    {
      dataKey: 'category',
    },
    {
      dataKey: 'image',
    },
    {
      dataKey: 'rate',
    },
    {
      dataKey: 'count',
    },
  ];

  constructor() {}

  getFormParams() {
    return of(this.formFields).pipe(
      map((formField) => formField.map((formField) => formField.dataKey))
    );
  }
}
