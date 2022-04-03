import { TableKanji, emptyTableKanji } from './../../models/user-kanji.model';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-user-kanji-card',
  templateUrl: './user-kanji-card.component.html',
  styleUrls: ['./user-kanji-card.component.scss']
})
export class UserKanjiCardComponent implements OnInit {
  @Input() cardData: TableKanji = emptyTableKanji;
  @Output() expressionToOutput = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {

  }

  outputExpression(expression: string) {
    this.expressionToOutput.emit(expression);
  }

}
