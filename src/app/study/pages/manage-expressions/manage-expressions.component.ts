import { SortingService } from './../../services/sorting.service';
import { emptyTableData, TableData } from './../../../shared/models/table-data.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormGroup } from '@angular/forms';
import { SpinnerService } from 'src/app/shared/components/spinner/spinner.service';
import { Expression } from '../../models/expression.model';
import { ExpressionsService } from '../../services/expressions.service';
import { ManageExpressionsService } from './manage-expressions.service';
import { TagsService } from '../../services/tags.service';
import { ActivatedRoute, Router } from '@angular/router';
import { QuerySearchService } from '../../services/query-search.service';
import { GenericFilter } from '../../models/query-search.model';
import { FetchedDataState, ReviewType } from 'src/app/shared/models/custom-types.model';
import { ReviewCardPopupService } from '../../components/review-card-popup/review-card-popup.service';

@Component({
  selector: 'app-manage-expressions',
  templateUrl: './manage-expressions.component.html',
  styleUrls: ['./manage-expressions.component.scss', './../manage-user-kanji/manage-user-kanji.component.scss']
})
export class ManageExpressionsComponent implements OnInit {
  public panelOpenState = true;
  public searchForm: UntypedFormGroup;
  public filteredExpressions: Expression[] = [];
  public tableData: TableData = emptyTableData;
  public tagCombinations: any = [];
  public expressionsByDifficulty: any = [];
  public fetchedDataState: FetchedDataState = 'init';
  public cardsFilteredExpressions: Expression[] = [];

  constructor(private formBuilder: FormBuilder,
              private expressionsService: ExpressionsService,
              private manageExpressionsService: ManageExpressionsService,
              private tagsService: TagsService,
              private spinner: SpinnerService,
              private route: ActivatedRoute,
              private router: Router,
              private querySearchService: QuerySearchService,
              private sortingService: SortingService,
              private reviewCardPopupService: ReviewCardPopupService) {
    this.searchForm = this.formBuilder.group({
      searchList: [''],
      reading: '',
      jlpt: null,
      lesson: [''],
      difficulty: [],
      tags: ['']
    })
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['search'] || params['filter']) {
        this.panelOpenState = false;
        this.spinner.open();
        const filter = this.querySearchService.getFilterFromUrlParams(params);
        this.filter(filter);
      }
    })
  }

  search() {
    this.spinner.open();
    const url = this.querySearchService.generateUrlfromFilter(this.searchForm.value);
    if (url !== null) {
      this.router.navigate(['/study/manage/expressions'], { queryParams: {[url.key]: url.url} });
    }
  }

  filter(filter: GenericFilter) {
    this.fetchedDataState = 'loading';
    this.expressionsService.filterExpressions(filter).subscribe(
      res => {
        this.filteredExpressions = res;
        if (this.filteredExpressions.length > 0) {
          this.cardsFilteredExpressions = this.filteredExpressions.slice(0, 10);
          const expressionsByJlptLevel = this.sortingService.sortExpressionsByJlptLevel(this.filteredExpressions)
          this.tableData = this.manageExpressionsService.generateTableData(expressionsByJlptLevel);
          this.tagCombinations = this.sortingService.sortByTagCombination(this.filteredExpressions);
          this.expressionsByDifficulty = this.sortingService.sortByDifficultyText(this.filteredExpressions)
            .filter(e => e.list.length > 0);
        } else {
          this.fetchedDataState = 'no data';
        }
        this.spinner.close();
      }
    )
  }

  showMoreCards() {
    this.cardsFilteredExpressions = this.filteredExpressions;
  }

  review(reviewType: ReviewType) {
    this.reviewCardPopupService.open(this.filteredExpressions, 'expression', reviewType);
  }

}
