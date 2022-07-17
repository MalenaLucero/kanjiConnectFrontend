import { TestBed } from '@angular/core/testing';

import { SelectValuesService } from './select-values.service';

xdescribe('SelectValuesService', () => {
  let service: SelectValuesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectValuesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
