import { Injectable } from '@angular/core';

// @Injectable()
export class LoggerService {
  constructor() {}

  handleEvent(eventName: string) {
    const timeOfAction = new Date();

    console.log('event executed: ' + eventName + ' ' + timeOfAction);
  }
}
