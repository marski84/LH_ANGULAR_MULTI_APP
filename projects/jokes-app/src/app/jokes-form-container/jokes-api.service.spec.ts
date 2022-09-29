/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { JokesApiService } from './jokes-api.service';

describe('Service: JokesApi', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JokesApiService]
    });
  });

  it('should ...', inject([JokesApiService], (service: JokesApiService) => {
    expect(service).toBeTruthy();
  }));
});
