import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserKanji } from '../../models/user-kanji.model';
import { Expression, emptyExpression } from '../../models/expression.model';
import { DataType, ReviewType } from 'src/app/shared/models/custom-types.model';

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
  @Input() reviewType: ReviewType = 'reading';
  @Input() total: number = 0;
  @Input() currentIndex: number = 0;

  constructor() { }

  ngOnInit(): void {
    if (this.type === 'expression') {
      const data = this.cardData as Expression;
      this.main = this.reviewType === 'reading' ? data.word : data.reading;
      this.hint = this.reviewType === 'reading' ? data.exampleSentences[0].sentence : data.englishMeaning[0];
    } else {
      const data = this.cardData as UserKanji;
      this.main = this.reviewType === 'reading' ? data.kanji.kanji : data.kanji.kun_readings.toString() || data.kanji.on_readings.toString();
      this.hint = this.reviewType === 'reading'
        ? data.hasOwnProperty('expressions') ? data.expressions[0].word : data.kanji.meanings[0]
        : data.kanji.meanings[0];
    }
  }

  reverseCard() {
    this.showReverse.emit();
  }
}

