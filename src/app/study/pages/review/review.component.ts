import { emptyExpression } from '../../models/expression.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataType, ReviewType } from '../../../shared/models/custom-types.model';
import { Component } from '@angular/core';
import { ExpressionsService } from 'src/app/study/services/expressions.service';
import { Expression, FilterExpressionsDto } from 'src/app/study/models/expression.model';
import { CardFilter } from 'src/app/study/models/card-filter.model';
import { UserKanji, UserKanjiFilter } from 'src/app/study/models/user-kanji.model';
import { UserKanjiService } from 'src/app/study/services/user-kanji.service';
import { MatDialog } from '@angular/material/dialog';
import { SpinnerService } from 'src/app/shared/components/spinner/spinner.service';
import { SortingService } from '../../services/sorting.service';
import { ReviewCardPopupService } from '../../components/review-card-popup/review-card-popup.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent {
  public currentReviewData: Expression | UserKanji = emptyExpression;
  public reviewDataList: Expression[] | UserKanji[] = [];
  public total: number = 0;
  public currentIndex: number = 0;
  public type: DataType = 'expression';
  public reviewType: ReviewType = 'reading';
  private wasFirstSnackShown = false;

  constructor(private expressionsService: ExpressionsService,
    private userKanjiService: UserKanjiService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private spinner: SpinnerService,
    private sortingService: SortingService,
    private reviewCardPopupService: ReviewCardPopupService) { }

  getReviewData(json: FilterExpressionsDto | UserKanjiFilter) {
    this.spinner.open();
    this.currentIndex = 0;
    const startIndex = json.startIndex || 0;
    if (this.type === 'expression') {
      this.expressionsService.filterExpressions(json).subscribe({
        next: res => {
          this.spinner.close();
          if (res.length > 0) {
            this.reviewDataList = this.sortingService.sortByDifficulty(res).slice(startIndex);
            this.total = this.reviewDataList.length;
            this.currentReviewData = this.reviewDataList[this.currentIndex];
            this.reviewCardPopupService.open(this.reviewDataList, this.type, this.reviewType);
          } else {
            this.snackBar.open('No cards match the criteria', 'Try another filter', { duration: 4000 });
          }
        }, error: () => {
          this.spinner.close();
        }
      })
    } else if (this.type === 'user-kanji') {
      this.userKanjiService.filterUserKanji(json).subscribe({
        next: res => {
          this.spinner.close();
          if (res.length > 0) {
            this.reviewDataList = this.sortingService.sortByDifficulty(res).slice(startIndex);
            this.total = this.reviewDataList.length;
            this.currentReviewData = this.reviewDataList[this.currentIndex];
            this.reviewCardPopupService.open(this.reviewDataList, this.type, this.reviewType);
          } else {
            this.snackBar.open('No cards match the criteria', 'Try another filter', { duration: 4000 })
          }
        }, error: () => {
          this.spinner.close();
        }
      })
    }
  }

  setFilter(event: CardFilter) {
    if (event.type) {
      this.type = event.type;
      this.reviewType = event.reviewType || 'reading';
      delete event.type;
      delete event.reviewType;
      this.getReviewData(event);
    }
  }
}
