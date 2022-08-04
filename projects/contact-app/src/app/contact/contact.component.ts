import { Component, Input, OnInit } from '@angular/core';
import { Contact } from '../models/Contact';
import { LoggerService } from '../../../../modules/shared/logger.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  @Input() contact!: Contact;
  @Input() contactIndex!: number;

  constructor(private logger: LoggerService) {}

  ngOnInit(): void {
    console.log(this.contact);
  }

  handleMessageSend() {
    this.logger.handleEvent(this.contact.name);
  }
}
