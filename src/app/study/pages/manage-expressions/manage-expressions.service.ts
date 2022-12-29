import { TableData } from './../../../shared/models/table-data.model';
import { Injectable } from '@angular/core';
import { Expression } from '../../models/expression.model';

@Injectable({
  providedIn: 'root'
})
export class ManageExpressionsService {

  constructor() { }

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
}
