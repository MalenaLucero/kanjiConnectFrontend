import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { CreateExpressionDto, Expression, FilterExpressionsDto, UpdateExpressionDto, ExternalExpression } from '../models/expression.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExpressionsService {
  private user = '61478fb9b2cfde16186509b5';

  constructor(private http: HttpClient) { }

  filterExpressions(filter: FilterExpressionsDto) {
    return this.http.post<Expression[]>(environment.expressions + '/filter', filter);
  }

  update(id: string, data: UpdateExpressionDto) {
    return this.http.put<Expression>(environment.expressions + '/' + id, data);
  }

  create(data: CreateExpressionDto) {
    return this.http.post<Expression>(environment.expressions, data);
  }

  getExpressionExternalData(expression: string) {
    return this.http.get<ExternalExpression[]>(environment.expressions + '/external-data/' + expression);
  }
}
