import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { first, map, Subject, takeUntil } from 'rxjs';
import { Contact } from '../models/Contact';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.scss'],
})
export class EditContactComponent implements OnInit, OnDestroy {
  contactToEdit!: Contact;
  editedContact?: Contact;

  private onDestroy$: Subject<void> = new Subject<void>();

  constructor(
    private contactService: ContactService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.activatedRoute.params
      .pipe(
        takeUntil(this.onDestroy$),
        map((params: Params) => params['id']),
        map((contactIndex: number) =>
          this.contactService.getContactByIndex(contactIndex)
        )
      )
      .subscribe((contact: Contact) => (this.contactToEdit = contact));
  }

  handleContactDataEdit(editedContactData: Contact) {
    this.contactService
      .getContactList()
      .pipe(
        first(),
        map((contactList: Contact[]) => {
          const contactIndex = contactList.findIndex(
            (contact) => contact.id === editedContactData.id
          );
          contactList[contactIndex] = editedContactData;
          return contactList[contactIndex];
        })
      )
      .subscribe((result) => (this.editedContact = result));

    // navigate to home if success
    this.router.navigate(['/']);
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
