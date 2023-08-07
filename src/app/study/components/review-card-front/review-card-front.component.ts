import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserKanji } from '../../models/user-kanji.model';
import { Expression, emptyExpression } from '../../models/expression.model';
import { DataType } from 'src/app/shared/models/custom-types.model';

@Component({
  selector: 'app-review-card-front',
  templateUrl: './review-card-front.component.html',
  styleUrls: ['./review-card-front.component.scss']
})
export class ReviewCardFrontComponent implements OnInit {
  public showHint: boolean = false;
  public main: string = '';
  public hint: string = '';

  @Output() showReverse = new EventEmitter();
  @Input() cardData: Expression | UserKanji = emptyExpression;
  @Input() type: DataType = 'expression';
  @Input() total: number = 0;
  @Input() currentIndex: number = 0;

  constructor() { }

  ngOnInit(): void {
    if (this.type === 'expression') {
      const data = this.cardData as Expression;
      this.main = data.word;
      this.hint = data.exampleSentences[0].sentence;
    } else {
      const data = this.cardData as UserKanji;
      this.main = data.kanji.kanji;
      this.hint = data.expressions[0].word;
    }
  }

  reverseCard() {
    this.showReverse.emit();
  }
}

