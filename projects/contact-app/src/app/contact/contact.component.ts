import { Component, Input, OnInit } from '@angular/core';
import { Contact } from '../models/Contact';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  @Input() contact!: Contact;
  @Input() constactIndex!: number;

  constructor() {}

  ngOnInit(): void {
    console.log(this.contact);
  }
}
