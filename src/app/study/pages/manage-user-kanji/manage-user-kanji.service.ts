import { Injectable } from '@angular/core';

interface ParamsFilter {
  jlpt?: number;
  lesson?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ManageUserKanjiService {

  constructor() { }

  getFilterFromParams(filter: string): ParamsFilter {
    const paramsFilter: ParamsFilter = {};

    filter.split('|').forEach(e => {
      const key = e.split(':')[0];
      if (key === 'jlpt' || key === 'lesson') {
        const value = e.split(':')[1];
        switch(key) {
          case 'jlpt':
            paramsFilter.jlpt = parseInt(value, 10);
            break;
          case 'lesson':
            paramsFilter.lesson = value;
            break;
        }
      }
    })

    return paramsFilter;
  }
}
