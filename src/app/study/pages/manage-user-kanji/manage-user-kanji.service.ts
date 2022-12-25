import { Injectable } from '@angular/core';
import { TableData } from 'src/app/shared/models/table-data.model';
import { UserKanji } from '../../models/user-kanji.model';

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

  getTableData(userKanjiList: UserKanji[]): TableData {
    const propertyNames = ['number', 'kanji', 'expressions', 'kun_readings', 'on_readings'];
    const displayedColumns = ['no.', 'kanji', 'expressions', 'kun readings', 'on readings'];
    const data = userKanjiList.map((userKanji, index) => {
      return {
        kanji: userKanji.kanji.kanji,
        expressions: userKanji.expressions.map(e => e.word),
        on_readings: userKanji.kanji.on_readings,
        kun_readings: userKanji.kanji.kun_readings,
        number: index + 1
      }
    })

    return {
      displayedColumns,
      propertyNames,
      data,
    }
  }
}
