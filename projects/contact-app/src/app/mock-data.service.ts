import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Contact } from './models/Contact';
import { contactType } from './models/ContactType.enum';

@Injectable({
  providedIn: 'root',
})
export class MockDataService {
  first: Contact = {
    name: 'Adress',
    type: contactType.adress,
    backgroundColor: 'blue',
    adressAdditionalInfo: {
      street: 'gs',
      streetNumber: 'gg',
      homeNumber: 'f',
    },
  };

  second: Contact = {
    name: 'Phone',
    type: contactType.phone,
    backgroundColor: 'yellow',
    phoneAdditionalInfo: '666666666',
  };

  third: Contact = {
    name: 'email',
    type: contactType.email,
    backgroundColor: 'red',
    emailAdditionalInfo: 'av@o2.pl',
  };

  contactList: Contact[] = [this.first, this.second, this.third];
  constructor() {}

  getContactList() {
    return of(this.contactList);
  }
}
