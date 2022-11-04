/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DictionaryService } from '../jokes-form/dictionary.service';

describe('Service: Dictionary', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DictionaryService]
    });
  });

  it('should ...', inject([DictionaryService], (service: DictionaryService) => {
    expect(service).toBeTruthy();
  }));
});
