import { Injectable } from '@angular/core';
import { EventType } from 'projects/contact-app/src/app/models/EventType.enum';
import { IEventDictionary } from '../../../contact-app/src/app/models/IEventDictionary';

@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  constructor() {}

  handleEvent(eventName: string) {
    const timeOfAction = new Date();
    console.log();
  }
}
