import { Injectable } from '@angular/core';
import { FilterExpressionsDto } from '../../models/expression.model';
import { TagsService } from '../../services/tags.service';

@Injectable({
  providedIn: 'root'
})
export class ManageExpressionsService {
  private user = '61478fb9b2cfde16186509b5';

  constructor(private tagsService: TagsService) { }

  generateFilter(searchForm: any): FilterExpressionsDto {
    const filter: FilterExpressionsDto = { user: this.user };
    if (searchForm.lesson?.length !== 0) {
      filter.lesson = searchForm.lesson;
    }
    if (searchForm.jlpt !== null) {
      filter.jlpt = searchForm.jlpt;
    }
    const tags = searchForm.tags;
    const tagNames = Object.keys(tags).filter(key => tags[key] === true);
    if (tagNames.length > 0) {
      const tagIds = this.tagsService.getTagIdsFromNames(tagNames);
      filter.tags = tagIds;
    }
    return filter;
  }
}
