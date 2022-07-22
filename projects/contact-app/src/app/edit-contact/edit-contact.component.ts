import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Contact } from '../models/Contact';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.scss'],
})
export class EditContactComponent implements OnInit {
  onDestroy$: Subject<void> = new Subject<void>();

  selectedContactIndex!: number;

  contactToEdit!: Contact;
  constructor(
    private contactService: ContactService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.params
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((routeParams: Params) => {
        console.log(routeParams);
        this.contactService.selectedContact = routeParams['id'];
        this.selectedContactIndex = routeParams['id'];
        this.contactToEdit = this.contactService.selectedContactDetails;
      });
  }

  handleContactDataEdit(editedContactData: Contact) {
    console.log(editedContactData);
    this.contactService.editContactData(
      editedContactData,
      this.selectedContactIndex
    );
  }
}
