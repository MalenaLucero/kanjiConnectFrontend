import { TestBed } from '@angular/core/testing';

import { ReviewCardPopupService } from './review-card-popup.service';

describe('ReviewCardPopupService', () => {
  let service: ReviewCardPopupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReviewCardPopupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
