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

  getTableData(userKanjiList: UserKanji[]): TableData {
    const propertyNames = ['number', 'kanji', 'jlpt', 'expressions', 'kun_readings', 'on_readings'];
    const displayedColumns = ['no.', 'kanji', 'jlpt', 'expressions', 'kun readings', 'on readings'];
    const data = userKanjiList.map((userKanji, index) => {
      const jlpt = userKanji.kanji.jlpt || '-';
      return {
        kanji: userKanji.kanji.kanji,
        expressions: userKanji.hasOwnProperty('expressions') ? userKanji.expressions.map(e => e.word) : '',
        on_readings: userKanji.kanji.on_readings,
        kun_readings: userKanji.kanji.kun_readings,
        number: index + 1,
        jlpt: jlpt.toString(),
      }
    })

    return {
      displayedColumns,
      propertyNames,
      data,
    }
  }
}
