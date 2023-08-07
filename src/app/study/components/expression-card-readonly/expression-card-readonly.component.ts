
import { Component, Input } from '@angular/core';
import { Expression, emptyExpression } from '../../models/expression.model';

@Component({
  selector: 'app-expression-card-readonly',
  templateUrl: './expression-card-readonly.component.html',
  styleUrls: ['./expression-card-readonly.component.scss']
})
export class ExpressionCardReadonlyComponent {
  @Input() expression: Expression = emptyExpression;
}
