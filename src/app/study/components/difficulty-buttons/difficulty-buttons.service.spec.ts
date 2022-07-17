import { TestBed } from '@angular/core/testing';

import { DifficultyButtonsService } from './difficulty-buttons.service';

describe('DifficultyButtonsService', () => {
  let service: DifficultyButtonsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DifficultyButtonsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should work', () => {
    const number = service.getNewDifficulty(1);
    expect(number).toBe(2);
  })
});
