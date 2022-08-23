/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BetterLoggerService } from './better-logger.service';

describe('Service: BetterLogger', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BetterLoggerService]
    });
  });

  it('should ...', inject([BetterLoggerService], (service: BetterLoggerService) => {
    expect(service).toBeTruthy();
  }));
});
