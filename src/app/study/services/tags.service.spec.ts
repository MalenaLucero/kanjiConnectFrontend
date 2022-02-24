import { HttpClientTestingModule } from '@angular/common/http/testing';
import { fakeAsync, flush, TestBed } from '@angular/core/testing';
import { TAGS, TAG_IDS, TAG_NAMES } from 'data/raw-form-expression';
import { of } from 'rxjs';

import { TagsService } from './tags.service';

describe('TagsService', () => {
  let service: TagsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [HttpClientTestingModule], 
    });
    service = TestBed.inject(TagsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an array of ids as string', () => {
    service.setTags(TAGS);
    const tagIds = service.getTagIds(TAG_NAMES);
    expect(tagIds).toEqual(TAG_IDS)
  })
});