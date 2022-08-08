import { Component, OnInit } from '@angular/core';
import { Expression } from '../../models/expression.model';
import { ExpressionPopupComponent } from '../../components/expression-popup/expression-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { TableKanji, UserKanji, UserKanjiFilter } from '../../models/user-kanji.model';
import { take } from 'rxjs';
import { UserKanjiService } from '../../services/user-kanji.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SpinnerService } from 'src/app/shared/components/spinner/spinner.service';
import { ManageUserKanjiService } from './manage-user-kanji.service';

type FilterOptions = 'jlpt' | 'lesson';
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
  public tableUserKanji: TableKanji[] = [];
  public columnTitles = ['number', 'kanji', 'expressions', 'kun_readings', 'on_readings'];
  public filterUrl = '';
  public showFilterUrl = false;

  constructor(private userKanjiService: UserKanjiService,
              private dialog: MatDialog,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private spinner: SpinnerService,
              private manageUserKanjiService: ManageUserKanjiService) {
                this.searchForm = this.formBuilder.group({
                  kanjiList: [''],
                  jlpt: null,
                  lesson: [''],
                  tags: ['']
                })
              }

  ngOnInit(): void {
    this.route.queryParams.pipe(take(1)).subscribe(params => {
      if (params['search']) {
        this.searchForm.get('kanjiList')?.setValue(params['search'])
        this.filterUserKanji();
      } else if (params['filter']) {
        const filter = this.manageUserKanjiService.getFilterFromParams(params['filter']);
        Object.keys(filter).forEach(key => {
          if (key === 'jlpt' || key === 'lesson') {
            this.searchForm.get(key)?.setValue(filter[key]);
          }
        });
        this.filterUserKanji();
      } else {
        this.userKanjiService.userKanjiFilter$.pipe(take(1)).subscribe(res => {
          if (res.length > 0) {
            this.userKanjiList = res;
            this.tableUserKanji = this.getTableUserKanji(res);
          } else {
            this.panelOpenState = true;
          }
        })
      }
    });
  }

  search() {
    this.filterUserKanji();
    this.showFilterUrl = false;
    this.generateFilterUrl();
  }

  filterUserKanji() {
    this.spinner.open();
    const filter = this.userKanjiService.generateFilter(this.searchForm.value);
    this.userKanjiService.filterUserKanji(filter).pipe(take(1)).subscribe(res => {
      this.userKanjiService.setUserKanjiFilter(res);
      this.userKanjiList = res;
      this.tableUserKanji = this.getTableUserKanji(res);
      this.spinner.close();
    })
  }

  getTableUserKanji(userKanjiList: UserKanji[]): TableKanji[] {
    return userKanjiList.map((userKanji, index) => {
      return {
        kanji: userKanji.kanji.kanji,
        expressions: userKanji.expressions.map(e => e.word),
        on_readings: userKanji.kanji.on_readings,
        kun_readings: userKanji.kanji.kun_readings,
        number: index + 1
      }
    })
  }

  showExpression(expression: Expression) {
    this.dialog.open(ExpressionPopupComponent, {
      width: '400px',
      height: '80vh',
      data: expression
    });
  }

  generateFilterUrl() {
    const baseUrl = 'https://kanji-connect.vercel.app/study/manage/user-kanji?';
    const filter = this.searchForm.value;
    let filterString = '';
    if (filter.kanjiList.length > 0) {
      filterString = baseUrl + 'search=' + filter.kanjiList;
    } else {
      filterString = baseUrl + 'filter=';
      if (filter.jlpt !== null && filter.jlpt > 0) {
        filterString = filterString + 'jlpt:' + filter.jlpt + '%7C'
      }
      if (filter.lesson !== null && filter.lesson.length > 0) {
        filterString = filterString + 'lesson:' + filter.lesson;
      }
    }
    this.filterUrl = filterString;
  }
}
