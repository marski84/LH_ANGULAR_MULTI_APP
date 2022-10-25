import { Injectable } from '@angular/core';

// @Injectable()
export class BetterLoggerService {
  constructor() {}

  handleEvent(eventName: string) {
    const timeOfAction = new Date();

    console.log(
      'better logger service: event executed: ' + eventName + ' ' + timeOfAction
    );
  }
}
