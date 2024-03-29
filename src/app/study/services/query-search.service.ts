import { Injectable } from '@angular/core';
import { Jlpt } from 'src/app/shared/models/custom-types.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ValidationService } from 'src/app/shared/services/validation.service';
import { GenericFilter, SearchParams } from '../models/query-search.model';
import { TagsService } from './tags.service';
interface FormData {
  searchList?: string,
  reading?: string,
  jlpt?: number,
  lesson?: string,
  tags?: string[],
  difficulty?: number[],
}
@Injectable({
  providedIn: 'root'
})
export class QuerySearchService {
  private user: string;

  constructor(private validationService: ValidationService,
              private tagsService: TagsService,
              private authService: AuthService) {
                this.user = authService.getUserId();
              }

  generateUrlfromFilter(formData: FormData): { key: string, url: string } {
    let key: 'search' | 'filter' | null = null;
    let filterString = '';
    if (formData.searchList && formData.searchList.length > 0) {
      key = 'search';
      filterString = formData.searchList;
    } else {
      key = 'filter';
      if (formData.reading && formData.reading.length > 0) {
        filterString = filterString + 'reading:' + formData.reading + '|'
      }
      if (formData.jlpt && formData.jlpt > 0) {
        filterString = filterString + 'jlpt:' + formData.jlpt + '|'
      }
      if (formData.lesson && formData.lesson.length > 0) {
        filterString = filterString + 'lesson:' + formData.lesson + '|';
      }
      if (formData.difficulty && formData.difficulty.length > 0) {
        filterString = filterString + 'difficulty:' + formData.difficulty.toString() + '|';
      }
      if (formData.tags) {
        const tagNames = Object.entries(formData.tags)
          .filter(tag => tag[1]).map(tag => tag[0]);
        if (tagNames.length > 0) {
          const tagIds = this.tagsService.getTagIdsFromNames(tagNames);
          filterString = filterString + 'tags:' + tagIds.toString();
        }
      }
    }

    return {
      key: key,
      url: filterString,
    }
  }

  getFilterFromUrlParams(params: SearchParams): GenericFilter {
    const { search, filter } = params;
    const formData: GenericFilter = {};
    if (search) {
      formData.searchList = search.split(',').map(e => e.trim());
      return formData;
    } else if (filter) {
      const rawObjectFromParams: any = {}
      filter.split('|')
        .forEach(str => {
          const key = str.split(':')[0];
          const value = str.split(':')[1];
          rawObjectFromParams[key] = value;
        })
      const formData: GenericFilter = {};
      const filterKeys = ['reading', 'jlpt', 'lesson', 'tags', 'difficulty'];

      Object.keys(rawObjectFromParams).forEach(key => {
        if (filterKeys.includes(key)) {
          const value = rawObjectFromParams[key];
          switch(key) {
            case 'reading':
              if (this.validationService.isReadingValid(value)) {
                formData.reading = value;
              }
              break;
            case 'jlpt':
              const jlpt = parseInt(value, 10) as Jlpt;
              if (this.validationService.isJlptValid(jlpt)){
                formData.jlpt = jlpt;
              }
              break;
            case 'lesson':
              if (this.validationService.isMongoIdValid(value)) {
                formData.lesson = value;
              }
              break;
            case 'difficulty':
              const difficultyArray = value.split(',').map((e: string) => parseInt(e, 10));
              if (this.validationService.isDifficultyArrayValid(difficultyArray)) {
                formData.difficulty = difficultyArray;
              }
              break;
            case 'tags':
              const tagIds = value.split(',');
              const validationArray = tagIds.map((id: string) => this.validationService.isMongoIdValid(id))
              if (this.validationService.isValidationArrayValid(validationArray)) {
                formData.tags = tagIds;
              }
              break;
          }
        }
      })
      return formData
    }
    return formData;
  }
}
