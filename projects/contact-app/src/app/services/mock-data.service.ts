import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Contact } from '../models/Contact';
import { contactType } from '../models/ContactType.enum';
import { faker } from '@faker-js/faker';

@Injectable({
  providedIn: 'root',
})
export class MockDataService {
  first: Contact = {
    id: faker.datatype.uuid(),
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
    id: faker.datatype.uuid(),
    name: 'Phone',
    type: contactType.phone,
    backgroundColor: 'yellow',
    phoneAdditionalInfo: '666666666',
  };

  third: Contact = {
    id: faker.datatype.uuid(),
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
