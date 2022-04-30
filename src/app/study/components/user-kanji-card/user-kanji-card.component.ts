import { Expression } from 'src/app/study/models/expression.model';
import { UserKanji, emptyUserKanji } from 'src/app/study/models/user-kanji.model';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-user-kanji-card',
  templateUrl: './user-kanji-card.component.html',
  styleUrls: ['./user-kanji-card.component.scss']
})
export class UserKanjiCardComponent implements OnInit {
  @Input() cardData: UserKanji = emptyUserKanji;
  @Output() expressionToOutput = new EventEmitter<Expression>();

  constructor() { }

  ngOnInit(): void {

  }

  outputExpression(expression: Expression) {
    this.expressionToOutput.emit(expression);
  }

}
