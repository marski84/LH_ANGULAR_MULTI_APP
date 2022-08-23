import { Component, Input, OnInit } from '@angular/core';
import { LoggerService } from 'projects/modules/shared/logger.service';
import { Contact } from '../models/Contact';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  @Input() contact!: Contact;
  @Input() contactIndex!: number;

  constructor(private logger: LoggerService) {}

  ngOnInit(): void {}

  handleMessageSend() {
    this.logger.handleEvent(this.contact.name);
  }
}
