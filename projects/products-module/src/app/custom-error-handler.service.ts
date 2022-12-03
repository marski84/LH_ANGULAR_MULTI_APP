import { ErrorHandler, Injectable } from '@angular/core';

@Injectable()
export class CustomErrorHandler implements ErrorHandler {
  constructor() {
    console.log('custom error');
  }

  handleError(error: unknown) {
    console.log('error handler');

    try {
      console.log(error);
    } catch {
      throw error;
    }
  }
}
