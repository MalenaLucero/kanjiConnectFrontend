import { TestBed } from '@angular/core/testing';

import { UserKanjiService } from './user-kanji.service';

xdescribe('UserKanjiService', () => {
  let service: UserKanjiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserKanjiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
