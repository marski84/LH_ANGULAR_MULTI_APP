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
  onDestroy$: Subject<void> = new Subject<void>();

  constructor(
    private contactService: ContactService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((routeParams: Params) => console.log(routeParams));
  }
}
