import { Component, OnInit } from '@angular/core';
import { Expression } from '../../models/expression.model';
import { ExpressionPopupComponent } from '../../components/expression-popup/expression-popup.component';
import { ExpressionsService } from '../../services/expressions.service';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { TableKanji } from '../../models/user-kanji.model';
import { take } from 'rxjs';
import { UserKanjiService } from '../../services/user-kanji.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user-kanji',
  templateUrl: './manage-user-kanji.component.html',
  styleUrls: ['./manage-user-kanji.component.scss']
})
export class ManageUserKanjiComponent implements OnInit {
  userKanji: TableKanji[] = [];
  columnTitles = ['number', 'kanji', 'expressions', 'kun_readings', 'on_readings'];
  areCardsShown: boolean = true;
  searchParams: string[] = [];
  lesson2Kanji = ['臨', '透', '揺', '染', '芝', '尽', '哀', '護', '岐', '帳', '潜', '腐'];
  lesson3Kanji = ['脚', '郭', '致', '舗', '稿', '繕'];
  lesson4Kanji = ['泡', '坪', '霧', '焦', '浸', '牲', '妙', '淡', '蚊', '駄', '愚', '跳'];
  public searchForm: FormGroup;
  public panelOpenState = false;

  constructor(private userKanjiService: UserKanjiService,
              private expressionsService: ExpressionsService,
              private dialog: MatDialog,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder) {
                this.searchForm = this.formBuilder.group({
                  search: ['']
                })
              }

  ngOnInit(): void {
    this.route.queryParams.pipe(take(1)).subscribe(params => {
      if (params['search']) {
        this.searchParams = params['search'].split(',');
      } else {
        this.panelOpenState = true;
      }
    });
    this.triggerSearch(this.searchParams);
  }

  triggerSearch(kanjiList: string[]) {
    this.userKanjiService.userKanji$.subscribe(res => {
      if (res.length > 0) {
        this.userKanji = res.filter(data => kanjiList.includes(data.kanji));
      }
    })
  }

  search() {
    const kanjiList = this.searchForm.value.search.split(',');
    this.triggerSearch(kanjiList);
  }

  showCards() {
    this.areCardsShown = true;
  }

  showTable() {
    this.areCardsShown = false;
  }

  showExpression(expression: string) {
    this.expressionsService.expressions$.pipe(take(1)).subscribe(res => {
      const expressionData = res.find(e => e.word === expression) as Expression;
      this.dialog.open(ExpressionPopupComponent, {
        width: '400px',
        height: '80vh',
        data: expressionData
      });
    })
  }
}
