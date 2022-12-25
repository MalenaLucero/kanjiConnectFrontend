import { Component, Input, OnInit } from '@angular/core';
import { Expression } from '../../models/expression.model';
import { Tag } from '../../models/tag.model';
import { ExpressionPopupComponent } from '../../components/expression-popup/expression-popup.component';
import { MatDialog } from '@angular/material/dialog';

interface InputData {
  tagCombination: Tag[],
  expressions: Expression[],
}

@Component({
  selector: 'app-group-by-tags',
  templateUrl: './group-by-tags.component.html',
  styleUrls: ['./group-by-tags.component.scss']
})
export class GroupByTagsComponent implements OnInit {
  inputData: InputData[] = []

  @Input() set data(value: InputData[]) {
    this.inputData = value;
  }

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  showExpression(expression: Expression) {
    this.dialog.open(ExpressionPopupComponent, {
      width: '400px',
      height: '80vh',
      data: expression
    });
  }

}
