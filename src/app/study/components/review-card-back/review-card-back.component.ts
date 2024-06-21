import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DataType, Difficulty } from 'src/app/shared/models/custom-types.model';
import { UserKanji, emptyUserKanji } from '../../models/user-kanji.model';
import { Expression, emptyExpression } from '../../models/expression.model';

@Component({
  selector: 'app-review-card-back',
  templateUrl: './review-card-back.component.html',
  styleUrls: ['./review-card-back.component.scss']
})
export class ReviewCardBackComponent implements OnInit {
  public expressionData: Expression = emptyExpression;
  public kanjiData: UserKanji = emptyUserKanji;
  public isUserKanji = false;

  @Input() cardData: Expression | UserKanji = emptyExpression;
  @Input() type: DataType = 'expression';
  @Output() sendDifficulty = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
    if (this.cardData.hasOwnProperty('_id')) {
      this.isUserKanji = true;
    }
    if (this.type === 'expression') {
      this.expressionData = this.cardData as Expression;
    } else {
      this.kanjiData = this.cardData as UserKanji;
    }
  }

  updateDifficulty(newDifficulty: Difficulty) {
    this.sendDifficulty.emit(newDifficulty)
  }

}
