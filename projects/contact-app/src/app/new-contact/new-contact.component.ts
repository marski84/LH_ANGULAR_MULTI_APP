import { Component, OnInit } from '@angular/core';
import { Contact } from '../models/Contact';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-new-contact',
  templateUrl: './new-contact.component.html',
  styleUrls: ['./new-contact.component.scss'],
})
export class NewContactComponent implements OnInit {
  constructor(private contactService: ContactService) {}

  ngOnInit() {}

  handleAddContact(contact: Contact) {
    console.log(contact);
    this.contactService.addNewContactToList(contact);
  }
}
