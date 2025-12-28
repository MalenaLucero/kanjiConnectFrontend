import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { CreateExpressionDto, Expression, FilterExpressionsDto, UpdateExpressionDto, ExternalExpression } from '../models/expression.model';
import { BehaviorSubject } from 'rxjs';
import { GenericFilter } from '../models/query-search.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { DataFetchingService } from 'src/app/shared/services/data-fetching.service';

@Injectable({
  providedIn: 'root'
})
export class ExpressionsService {
  private user: string;

  constructor(private http: HttpClient,
              private authService: AuthService,
              private dataFetchingService: DataFetchingService) {
    this.user = this.authService.getUserId();
  }

  filterExpressions(filter: GenericFilter | FilterExpressionsDto) {
    filter.user = this.user;
    return this.http.post<Expression[]>(environment.expressions + '/filter', filter);
  }

  update(id: string, data: UpdateExpressionDto, showSpinner = true) {
    if(showSpinner) {
      this.dataFetchingService.openSpinner();
    }
    return this.http.put<Expression>(environment.expressionsPrivate + '/' + id, data);
  }

  create(data: CreateExpressionDto) {
    return this.http.post<Expression>(environment.expressionsPrivate, data);
  }

  getExpressionExternalData(expression: string) {
    return this.http.get<ExternalExpression[]>(environment.expressions + '/external-data/' + expression);
  }

  getExpressionsByUser() {
    return this.http.get<Expression[]>(environment.expressionsPrivate + '/user/' + this.user);
  }

  notFoundExpressions(filter: GenericFilter, expressions: Expression[]): string[] {
    const notFound: string[] = [];
    if (filter.searchList && filter.searchList.length > 0) {
      const { searchList } = filter;
      const foundExpressions = expressions.map(expression => expression.word);
      searchList.forEach(word => {
        if (!foundExpressions.includes(word)) {
          notFound.push(word)
        }
      })
      return notFound;
    }
    return notFound;
  }
}
