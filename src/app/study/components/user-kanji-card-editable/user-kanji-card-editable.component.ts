import { Expression } from 'src/app/study/models/expression.model';
import { UserKanji, emptyUserKanji } from 'src/app/study/models/user-kanji.model';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ExternalLinksService } from '../../services/external-links.service';

@Component({
  selector: 'app-user-kanji-card-editable',
  templateUrl: './user-kanji-card-editable.component.html',
  styleUrls: ['./user-kanji-card-editable.component.scss']
})
export class UserKanjiCardEditableComponent implements OnInit {
  @Input() cardData: UserKanji = emptyUserKanji;
  @Output() expressionToOutput = new EventEmitter<Expression>();
  public externalLinks: { title: string, link: string}[] = []

  constructor(private externalLinksService: ExternalLinksService) { }

  ngOnInit(): void {
    this.externalLinks = [
      {
        title: 'More kanji details',
        link: this.externalLinksService.kanjiDetails(this.cardData.kanji.kanji),
      }, {
        title: 'Words containing this kanji',
        link: this.externalLinksService.expressionsContainingKanji(this.cardData.kanji.kanji),
      },
    ]
  }

  outputExpression(expression: Expression) {
    this.expressionToOutput.emit(expression);
  }

}
