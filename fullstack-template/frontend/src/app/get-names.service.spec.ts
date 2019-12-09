import { TestBed } from '@angular/core/testing';

import { GetNamesService } from './get-names.service';

describe('GetNamesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetNamesService = TestBed.get(GetNamesService);
    expect(service).toBeTruthy();
  });
});
