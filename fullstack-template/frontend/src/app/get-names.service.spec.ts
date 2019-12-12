import { TestBed } from '@angular/core/testing';

import { SetNamesService } from './get-names.service';

describe('SetNamesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SetNamesService = TestBed.get(SetNamesService);
    expect(service).toBeTruthy();
  });
});
