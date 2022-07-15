import { Injectable } from '@angular/core';
import { IselectType, contactType } from './models/IselectType';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  typeSelectOptions: IselectType[] = [
    {
      value: contactType.email,
    },
    {
      value: contactType.adress,
    },
    {
      value: contactType.phone,
    },
  ];

  constructor() {}
}
