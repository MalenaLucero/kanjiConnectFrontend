import { TestBed } from '@angular/core/testing';

import { DifficultyService } from './difficulty.service';

xdescribe('DifficultyService', () => {
  let service: DifficultyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DifficultyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
