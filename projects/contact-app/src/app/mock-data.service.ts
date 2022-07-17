import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Contact } from './models/Contact';

@Injectable({
  providedIn: 'root',
})
export class MockDataService {
  first: Contact = {
    name: 'Adress',
    type: 'adress',
    backgroundColor: 'blue',
    adressAdditionalInfo: {
      street: 'gs',
      streetNumber: 'gg',
      homeNumber: 'f',
    },
  };

  second: Contact = {
    name: 'Phone',
    type: 'phone',
    backgroundColor: 'yellow',
    phoneAdditionalInfo: {
      phoneNumber: '666666666',
    },
  };

  third: Contact = {
    name: 'email',
    type: 'email',
    backgroundColor: 'red',
    emailAdditionalInfo: {
      emailAdress: 'av@o2.pl',
    },
  };

  contactList: Contact[] = [this.first, this.second, this.third];
  constructor() {}

  getContactList() {
    return of(this.contactList);
  }
}
