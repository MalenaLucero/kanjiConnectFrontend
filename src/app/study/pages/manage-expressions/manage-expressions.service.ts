import { TableData } from './../../../shared/models/table-data.model';
import { Injectable } from '@angular/core';
import { Expression } from '../../models/expression.model';

@Injectable({
  providedIn: 'root'
})
export class ManageExpressionsService {

  constructor() { }

  generateTableData(expressions: Expression[]): TableData {
    const propertyNames = ['number', 'word', 'jlpt', 'reading', 'englishMeaning'];
    const displayedColumns = ['no.', 'expression', 'jlpt', 'reading', 'english meaning'];
    const data = expressions.map((expression, i) => {
      const jlpt = expression.jlpt || '-';
      return {
        word: expression.word,
        reading: expression.reading,
        englishMeaning: expression.englishMeaning,
        number: i + 1,
        jlpt: jlpt.toString(),
      }
    })
    return {
      propertyNames,
      displayedColumns,
      data,
    }
  }
}
