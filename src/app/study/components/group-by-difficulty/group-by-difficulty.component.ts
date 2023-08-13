import { Component, Input } from '@angular/core';
import { DifficultyText } from 'src/app/shared/models/custom-types.model';
import { Expression } from '../../models/expression.model';
import { MatDialog } from '@angular/material/dialog';
import { ExpressionPopupComponent } from '../../components/expression-popup/expression-popup.component';

interface InputData {
  difficultyText: DifficultyText,
  list: Expression[],
}

@Component({
  selector: 'app-group-by-difficulty',
  templateUrl: './group-by-difficulty.component.html',
  styleUrls: ['./group-by-difficulty.component.scss']
})
export class GroupByDifficultyComponent {
  @Input() data: InputData[] = [];

  constructor(private dialog: MatDialog) {}

  showExpression(expression: Expression) {
    this.dialog.open(ExpressionPopupComponent, {
      width: '400px',
      height: '80vh',
      data: expression
    });
  }
}
