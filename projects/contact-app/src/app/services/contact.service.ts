import { MockDataService } from './mock-data.service';
import { Injectable } from '@angular/core';
import { IselectType } from '../models/contactTypeActionHandle.enum.';
import { Contact } from '../models/Contact';
import { take, of } from 'rxjs';
import { contactType } from '../models/ContactType.enum';

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

  editContactData(editedContact: Contact, contactIndex: number) {
    this._contactList[contactIndex] = editedContact;
  }
}
