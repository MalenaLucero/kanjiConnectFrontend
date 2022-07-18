import { Component, Input, OnInit } from '@angular/core';
import { emptyExpression, Expression } from '../../models/expression.model';

@Component({
  selector: 'app-expression-card',
  templateUrl: './expression-card.component.html',
  styleUrls: ['./expression-card.component.scss']
})
export class ExpressionCardComponent implements OnInit {
  @Input() expression: Expression = emptyExpression;

  constructor() { }

  ngOnInit(): void {
    console.log(this.expression);
  }

}
