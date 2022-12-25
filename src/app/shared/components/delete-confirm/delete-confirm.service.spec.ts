import { TestBed } from '@angular/core/testing';

import { DeleteConfirmService } from './delete-confirm.service';

xdescribe('DeleteConfirmService', () => {
  let service: DeleteConfirmService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeleteConfirmService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
