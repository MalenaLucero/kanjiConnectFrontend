import { TestBed } from '@angular/core/testing';

import { ManageExpressionsService } from './manage-expressions.service';

describe('ManageExpressionsService', () => {
  let service: ManageExpressionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageExpressionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
