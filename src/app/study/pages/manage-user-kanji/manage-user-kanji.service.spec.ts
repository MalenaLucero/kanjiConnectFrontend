import { TestBed } from '@angular/core/testing';

import { ManageUserKanjiService } from './manage-user-kanji.service';

describe('ManageUserKanjiService', () => {
  let service: ManageUserKanjiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageUserKanjiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
