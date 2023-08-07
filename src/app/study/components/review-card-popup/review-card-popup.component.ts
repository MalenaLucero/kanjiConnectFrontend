import { MatSnackBar } from '@angular/material/snack-bar';
import { CardFlipState, DataType, Difficulty } from '../../../shared/models/custom-types.model';
import { Component, OnInit, Inject } from '@angular/core';
import { Expression, UpdateExpressionDto, emptyExpression } from 'src/app/study/models/expression.model';
import { UserKanji } from 'src/app/study/models/user-kanji.model';
import { emptyCard, Card } from 'src/app/study/models/card.model';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ExpressionsService } from 'src/app/study/services/expressions.service';

@Component({
  selector: 'app-review-card-popup',
  templateUrl: './review-card-popup.component.html',
  styleUrls: ['./review-card-popup.component.scss']
})
export class ReviewCardPopupComponent implements OnInit {
  public cardFlipState: CardFlipState = 'back';
  public showHint: boolean = false;
  public cardData: Expression | UserKanji = emptyExpression;
  public currentIndex: number = 0;
  public total: number = 0;
  public type: DataType = 'expression';
  public isReviewCompleted: boolean = false;
  private wasFirstSnackShown = false;

  constructor(private dialogRef: MatDialogRef<ReviewCardPopupComponent>,
              private expressionsService: ExpressionsService,
              private snackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public data: { reviewData: Expression[] | UserKanji[], type: DataType }) { }

  ngOnInit(): void {
    this.total = this.data.reviewData.length;
    this.type = this.data.type;
    this.showCardFront()
  }

  showCardFront() {
    if (this.currentIndex < this.total) {
      const currentReviewData = this.data.reviewData[this.currentIndex];
      this.cardData = currentReviewData;
      this.cardFlipState = 'front';
      this.showHint = false;
    } else {
      this.isReviewCompleted = true;
      setTimeout(() => {
        this.dialogRef.close();
      }, 3000);
    }
  }

  updateDifficulty(updatedDifficulty: Difficulty) {
    const updateExpression: UpdateExpressionDto = { difficulty: updatedDifficulty };
    if (this.type === 'expression') {
      this.expressionsService.update(this.cardData._id, updateExpression).subscribe({
        next: res => {
          //this.snackBar.open('Difficulty will be updated', 'OK', { duration: 3000 })
        }, error: (err) => {
          if (!this.wasFirstSnackShown) {
            this.snackBar.open(`Difficulty won't be updated`, err.error.message, { duration: 3000 })
            this.wasFirstSnackShown = true;
          }
        }
      })
    } else if (this.type === 'user-kanji'){
      console.log('update user kanji')
    }

    this.currentIndex += 1;
    this.showCardFront();
  }

  showReverse() {
    this.cardFlipState = 'back';
  }

}
