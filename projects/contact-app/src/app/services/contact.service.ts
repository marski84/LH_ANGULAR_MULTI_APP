import { contactType } from './../models/ContactType.enum';
import { MockDataService } from './mock-data.service';
import { Injectable } from '@angular/core';
import { Contact } from '../models/Contact';
import { take, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private _contactList!: Contact[];

  typeSelectOptions: contactType[] = [
    contactType.email,
    contactType.adress,
    contactType.phone,
  ];

  addNewContactToList(contact: Contact) {
    this._contactList.push(contact);
  }

  constructor(private mockDataService: MockDataService) {
    this.mockDataService
      .getContactList()
      .pipe(take(1)) // first()
      .subscribe((response: Contact[]) => {
        this._contactList = response;
      });
  }

  getContactList() {
    return of(this._contactList);
  }

  getContactByIndex(index: number) {
    return this._contactList[index];
  }

  editContactData(editedContact: Contact, contactIndex: number) {
    this._contactList[contactIndex] = editedContact;
  }
}
