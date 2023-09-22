import { TestBed } from '@angular/core/testing';

import { QuerySearchService } from './query-search.service';
import { TagsService } from './tags.service';

class TagsServiceMock {

}

xdescribe('QuerySearchService', () => {
  let service: QuerySearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: TagsService, useValue: TagsServiceMock}
      ]
    });
    service = TestBed.inject(QuerySearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should generate URL from filter form data', () => {
    const formDataSearch = {
      searchList: 'a',
      jlpt: 1,
      lesson: 'b'.repeat(24),
      tags: ['tag1', 'tag2'],
    }
    const expectedOutputSearch = { key: 'search', url: 'a'};
    const actualOutputSearch = service.generateUrlfromFilter(formDataSearch);

    const formDataFilter = {
      jlpt: 1,
      lesson: 'b'.repeat(24)
    }
    const expectedOutputFilter = {
      key: 'filter',
      url: `jlpt:${formDataFilter.jlpt}|lesson:${formDataFilter.lesson}|`
    };
    const actualOutputFilter = service.generateUrlfromFilter(formDataFilter);

    expect(expectedOutputSearch).toEqual(actualOutputSearch);
    expect(expectedOutputFilter).toEqual(actualOutputFilter);
  })
});
