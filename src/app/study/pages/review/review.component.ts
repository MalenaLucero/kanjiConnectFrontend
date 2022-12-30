import { ReviewCardPopupComponent } from '../../components/review-card-popup/review-card-popup.component';
import { emptyExpression } from '../../models/expression.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataType } from '../../../shared/models/custom-types.model';
import { Component, OnInit } from '@angular/core';
import { ExpressionsService } from 'src/app/study/services/expressions.service';
import { Expression, FilterExpressionsDto } from 'src/app/study/models/expression.model';
import { TagsService } from '../../services/tags.service';
import { Tag } from 'src/app/study/models/tag.model';
import { CardFilter } from 'src/app/study/models/card-filter.model';
import { FetchedDataState } from 'src/app/shared/models/custom-types.model';
import { UserKanji, UserKanjiFilter } from 'src/app/study/models/user-kanji.model';
import { UserKanjiService } from 'src/app/study/services/user-kanji.service';
import { MatDialog } from '@angular/material/dialog';
import { SpinnerService } from 'src/app/shared/components/spinner/spinner.service';
import { GenericFilter } from '../../models/query-search.model';
import { SortingService } from '../../services/sorting.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {
  public currentReviewData: Expression | UserKanji = emptyExpression;
  public reviewDataList: Expression[] | UserKanji[] = [];
  public total: number = 0;
  public currentIndex: number = 0;
  public tags: Tag[] = [];
  public type: DataType = 'expression';
  private user = '61478fb9b2cfde16186509b5';
  private wasFirstSnackShown = false;

  constructor(private expressionsService: ExpressionsService,
              private userKanjiService: UserKanjiService,
              private tagsService: TagsService,
              private snackBar: MatSnackBar,
              private dialog: MatDialog,
              private spinner: SpinnerService,
              private sortingService: SortingService) { }

  ngOnInit(): void {
    this.getTags();
  }

  openDialog(reviewData: Expression[] | UserKanji[], type: DataType): void {
    const dialogRef = this.dialog.open(ReviewCardPopupComponent, {
      width: '400px',
      height: '80vh',
      data: { reviewData, type }
    });
  }

  getTags() {
    this.tagsService.getTagsByUser(this.user).subscribe(
      res => this.tags = res
    )
  }

  getReviewData(json: FilterExpressionsDto | UserKanjiFilter) {
    this.spinner.open();
    this.currentIndex = 0;
    if (this.type === 'expression') {
      this.expressionsService.filterExpressions(json).subscribe({
        next: res => {
          this.spinner.close();
          if (res.length > 0) {
            this.reviewDataList = this.sortingService.sortByDifficulty(res);
            this.total = this.reviewDataList.length;
            this.currentReviewData = this.reviewDataList[this.currentIndex];
            this.openDialog(this.reviewDataList, this.type);
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
            this.reviewDataList = this.sortingService.sortByDifficulty(res);;
            this.total = this.reviewDataList.length;
            this.currentReviewData = this.reviewDataList[this.currentIndex];
            this.openDialog(this.reviewDataList, this.type);
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
      delete event.type;
      this.getReviewData(event);
    }
  }
}
