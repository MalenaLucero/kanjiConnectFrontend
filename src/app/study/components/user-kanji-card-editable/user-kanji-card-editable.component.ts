import { Expression } from 'src/app/study/models/expression.model';
import { UserKanji, emptyUserKanji } from 'src/app/study/models/user-kanji.model';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-user-kanji-card-editable',
  templateUrl: './user-kanji-card-editable.component.html',
  styleUrls: ['./user-kanji-card-editable.component.scss']
})
export class UserKanjiCardEditableComponent implements OnInit {
  @Input() cardData: UserKanji = emptyUserKanji;
  @Output() expressionToOutput = new EventEmitter<Expression>();
  public kanjiDetailsLink: string = '';
  public wordsContainingKanjiLink: string = '';

  constructor() { }

  ngOnInit(): void {
    const kanji = this.cardData.kanji.kanji;
    this.kanjiDetailsLink = `https://jisho.org/search/${kanji}%20%23kanji`;
    this.wordsContainingKanjiLink = `https://jisho.org/search/*${kanji}*`;
  }

  outputExpression(expression: Expression) {
    this.expressionToOutput.emit(expression);
  }

}
