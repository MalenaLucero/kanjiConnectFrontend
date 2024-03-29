import { emptyTableData } from './../../../shared/models/table-data.model';
import { Component, OnInit } from '@angular/core';
import { Expression } from '../../models/expression.model';
import { ExpressionPopupComponent } from '../../components/expression-popup/expression-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { UserKanji } from '../../models/user-kanji.model';
import { take } from 'rxjs';
import { UserKanjiService } from '../../services/user-kanji.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SpinnerService } from 'src/app/shared/components/spinner/spinner.service';
import { ManageUserKanjiService } from './manage-user-kanji.service';
import { QuerySearchService } from '../../services/query-search.service';
import { TableData } from 'src/app/shared/models/table-data.model';
import { GenericFilter } from '../../models/query-search.model';
import { SortingService } from '../../services/sorting.service';
import { FetchedDataState, ReviewType } from 'src/app/shared/models/custom-types.model';
import { ReviewCardPopupService } from '../../components/review-card-popup/review-card-popup.service';

@Component({
  selector: 'app-user-kanji',
  templateUrl: './manage-user-kanji.component.html',
  styleUrls: ['./manage-user-kanji.component.scss']
})
export class ManageUserKanjiComponent implements OnInit {
  public areCardsShown: boolean = true;
  public panelOpenState = false;
  public searchForm: FormGroup;
  public userKanjiList: UserKanji[] = [];
  public tableData: TableData = emptyTableData;
  public fetchedDataState: FetchedDataState = 'init';
  public cardsUserKanjiList: UserKanji[] = [];

  constructor(private userKanjiService: UserKanjiService,
              private dialog: MatDialog,
              private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder,
              private spinner: SpinnerService,
              private manageUserKanjiService: ManageUserKanjiService,
              private querySearchService: QuerySearchService,
              private sortingService: SortingService,
              private reviewCardPopupService: ReviewCardPopupService) {
                this.searchForm = this.formBuilder.group({
                  kanjiList: [''],
                  jlpt: null,
                  lesson: [''],
                  tags: [''],
                  difficulty: ['']
                })
              }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['search'] || params['filter']) {
        this.panelOpenState = false;
        const filter = this.querySearchService.getFilterFromUrlParams(params);
        this.filterUserKanji(filter);
      } else {
        this.userKanjiService.userKanjiFilter$.pipe(take(1)).subscribe(res => {
          if (res.length > 0) {
            this.userKanjiList = res;
            this.tableData = this.manageUserKanjiService.getTableData(res);
          } else {
            this.panelOpenState = true;
          }
        })
      }
    });
  }

  search() {
    const formData = {
      ...this.searchForm.value,
      searchList: this.searchForm.get('kanjiList')?.value
    }
    delete formData.kanjiList;
    const url = this.querySearchService.generateUrlfromFilter(formData);
    if (url !== null) {
      this.router.navigate(['/study/manage/user-kanji'], { queryParams: {[url.key]: url.url} });
    }
  }

  filterUserKanji(filter: GenericFilter) {
    this.fetchedDataState = 'loading';
    this.spinner.open();
    this.userKanjiService.filterUserKanji(filter).pipe(take(1)).subscribe(res => {
      if (res.length > 0) {
        const orderedUserKanji = this.sortingService.sortKanjiByJlptLevel(res);
        this.userKanjiService.setUserKanjiFilter(orderedUserKanji);
        this.userKanjiList = orderedUserKanji;
        this.cardsUserKanjiList = orderedUserKanji.slice(0, 10);
        this.tableData = this.manageUserKanjiService.getTableData(orderedUserKanji);
      } else {
        this.fetchedDataState = 'no data';
      }
      this.spinner.close();
    })
  }

  showExpression(expression: Expression) {
    this.dialog.open(ExpressionPopupComponent, {
      width: '400px',
      height: '80vh',
      data: expression
    });
  }

  showMoreCards() {
    this.cardsUserKanjiList = this.userKanjiList;
  }

  review(reviewType: ReviewType) {
    this.reviewCardPopupService.open(this.userKanjiList, 'user-kanji', reviewType);
  }
}
