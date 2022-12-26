import { TableData } from './../../../shared/models/table-data.model';
import { Injectable } from '@angular/core';
import { Expression, FilterExpressionsDto } from '../../models/expression.model';
import { TagsService } from '../../services/tags.service';
import { Jlpt } from 'src/app/shared/models/custom-types.model';

interface ParamsFilter {
  jlpt?: number;
  lesson?: string;
}
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

  generateTableData(expressions: Expression[]): TableData {
    const propertyNames = ['number', 'word', 'reading', 'englishMeaning'];
    const displayedColumns = ['no.', 'expression', 'reading', 'english meaning'];
    const data = expressions.map((expression, i) => ({...expression, number: i + 1}))
    return {
      propertyNames,
      displayedColumns,
      data,
    }
  }

  getFilterFromParams(filter: string): FilterExpressionsDto {
    const paramsFilter: FilterExpressionsDto = { user: this.user };

    filter.split('|').forEach(e => {
      const key = e.split(':')[0];
      if (key === 'jlpt' || key === 'lesson' || 'tags') {
        const value = e.split(':')[1];
        switch(key) {
          case 'jlpt':
            paramsFilter.jlpt = parseInt(value, 10) as Jlpt;
            break;
          case 'lesson':
            paramsFilter.lesson = value;
            break;
          case 'tags':
            paramsFilter.tags = value.split(',');
            break;
        }
      }
    })

    return paramsFilter;
  }
}
