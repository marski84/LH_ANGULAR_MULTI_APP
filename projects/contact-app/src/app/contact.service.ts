import { MockDataService } from './mock-data.service';
import { Injectable, OnDestroy } from '@angular/core';
import { IselectType, contactType } from './models/IselectType';
import { Contact } from './models/Contact';
import { take, Subject, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private _contactList!: Contact[];

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

  private _selectedContact!: Contact;

  set selectedContact(index: number) {
    this._selectedContact = this._contactList[index];
  }

  get selectedContactDetails(): Contact {
    return this._selectedContact;
  }

  set addNewContactToList(contact: Contact) {
    this._contactList.push(contact);
  }

  constructor(private mockDataService: MockDataService) {
    this.mockDataService
      .getContactList()
      .pipe(take(1))
      .subscribe((response: Contact[]) => {
        this._contactList = response;
      });
  }

  getContactList() {
    return of(this._contactList);
  }
}
