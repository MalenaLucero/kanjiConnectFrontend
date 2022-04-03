import { Expression } from './../../models/expression.model';
import { Component, OnInit } from '@angular/core';
import { ExpressionsService } from '../../services/expressions.service';

@Component({
  selector: 'app-expressions',
  templateUrl: './expressions.component.html',
  styleUrls: ['./expressions.component.scss']
})
export class ExpressionsComponent implements OnInit {
  expressions: Expression[] = [];
  columnTitles = ['word', 'reading']

  constructor(private expressionsService: ExpressionsService) {}

  ngOnInit(): void {
    this.expressionsService.expressions$.subscribe(res => this.expressions = res)
    if(this.expressions.length === 0) {
      this.expressionsService.getExpressionsByUser();
      this.expressionsService.expressions$.subscribe(res => {
        this.expressions = res
      })
    }
  }


}
