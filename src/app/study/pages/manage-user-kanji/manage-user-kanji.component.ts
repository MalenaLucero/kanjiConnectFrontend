import { Component, OnInit } from '@angular/core';
import { Expression } from '../../models/expression.model';
import { ExpressionPopupComponent } from '../../components/expression-popup/expression-popup.component';
import { ExpressionsService } from '../../services/expressions.service';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { TableKanji, UserKanji, UserKanjiFilter } from '../../models/user-kanji.model';
import { take } from 'rxjs';
import { UserKanjiService } from '../../services/user-kanji.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SpinnerService } from 'src/app/shared/components/spinner/spinner.service';

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
  private lesson2Kanji = ['臨', '透', '揺', '染', '芝', '尽', '哀', '護', '岐', '帳', '潜', '腐'];
  private lesson3Kanji = ['脚', '郭', '致', '舗', '稿', '繕'];
  private lesson4Kanji = ['泡', '坪', '霧', '焦', '浸', '牲', '妙', '淡', '蚊', '駄', '愚', '跳'];

  constructor(private userKanjiService: UserKanjiService,
              private expressionsService: ExpressionsService,
              private dialog: MatDialog,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private spinner: SpinnerService) {
                this.searchForm = this.formBuilder.group({
                  search: ['']
                })
              }

  ngOnInit(): void {
    this.route.queryParams.pipe(take(1)).subscribe(params => {
      if (params['search']) {
        const kanjiList = params['search'].split(',');
        this.filterUserKanji(kanjiList);
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
    const kanjiList = this.searchForm.value.search.split(',');
    this.filterUserKanji(kanjiList);
  }

  filterUserKanji(kanjiList: string[]) {
    this.spinner.open();
    const filter: UserKanjiFilter = {user: '61478fb9b2cfde16186509b5', kanjiList, jlpt: 1}
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
}
