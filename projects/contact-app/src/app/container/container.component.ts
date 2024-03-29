import { Component, OnInit, OnDestroy } from '@angular/core';
import { ContactService } from '../services/contact.service';
import { Subscription, takeUntil, take, Subject } from 'rxjs';
import { Contact } from '../models/Contact';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
})
export class ContainerComponent implements OnInit {
  contactList$ = this.contactService.getContactList();
  private onDestroy$: Subject<void> = new Subject<void>();

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {}
}
