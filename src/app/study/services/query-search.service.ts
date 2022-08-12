import { Injectable } from '@angular/core';

interface SearchParams {
  search?: string,
  filter?: string,
}

interface FormData {
  searchList: string,
  jlpt: number,
  lesson: string,
  tags: string[]
}

@Injectable({
  providedIn: 'root'
})
export class QuerySearchService {

  constructor() { }

  generateUrlfromFilter(formData: FormData): { search: string } | { filter: string } | null {
    let key: 'search' | 'filter' | null = null;
    const filter = formData;
    let filterString = '';
    if (filter.searchList.length > 0) {
      key = 'search';
      filterString = filter.searchList;
    } else {
      key = 'filter';
      if (filter.jlpt !== null && filter.jlpt > 0) {
        filterString = filterString + 'jlpt:' + filter.jlpt + '|'
      }
      if (filter.lesson !== null && filter.lesson.length > 0) {
        filterString = filterString + 'lesson:' + filter.lesson;
      }
    }
    if (key === 'search') {
      return { search: filterString }
    } else if (key === 'filter'){
      return { filter: filterString }
    }
    return null;
  }

  getFilterFromUrlParams(params: SearchParams) {
    const formData: FormData = {
      searchList: '',
      jlpt: 0,
      lesson: '',
      tags: []
    }
    if (params.search) {
      formData.searchList = params.search;
    } else if (params.filter) {
      params.filter.split('|').forEach(e => {
        const key = e.split(':')[0];
        if (key === 'jlpt' || key === 'lesson') {
          const value = e.split(':')[1];
          switch(key) {
            case 'jlpt':
              formData.jlpt = parseInt(value, 10);
              break;
            case 'lesson':
              formData.lesson = value;
              break;
          }
        }
      })
    }
    return formData;
  }
}
