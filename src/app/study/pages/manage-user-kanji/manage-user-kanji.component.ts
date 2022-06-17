import { Component, OnInit } from '@angular/core';
import { Expression } from '../../models/expression.model';
import { ExpressionPopupComponent } from '../../components/expression-popup/expression-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { TableKanji, UserKanji, UserKanjiFilter } from '../../models/user-kanji.model';
import { take } from 'rxjs';
import { UserKanjiService } from '../../services/user-kanji.service';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { SpinnerService } from 'src/app/shared/components/spinner/spinner.service';

@Component({
  selector: 'app-user-kanji',
  templateUrl: './manage-user-kanji.component.html',
  styleUrls: ['./manage-user-kanji.component.scss']
})
export class ManageUserKanjiComponent implements OnInit {
  public areCardsShown: boolean = true;
  public panelOpenState = false;
  public searchForm: UntypedFormGroup;
  public userKanjiList: UserKanji[] = [];
  public tableUserKanji: TableKanji[] = [];
  public columnTitles = ['number', 'kanji', 'expressions', 'kun_readings', 'on_readings'];
  private lesson2Kanji = ['臨', '透', '揺', '染', '芝', '尽', '哀', '護', '岐', '帳', '潜', '腐'];
  private lesson3Kanji = ['脚', '郭', '致', '舗', '稿', '繕'];
  private lesson4Kanji = ['泡', '坪', '霧', '焦', '浸', '牲', '妙', '淡', '蚊', '駄', '愚', '跳'];
  private lesson5Kanji = ['渋', '循', '繁', '弾', '寂', '汽', '疎', '犠', '竣', '遇', '赴', '義'];
  private lesson6Kanji = ['跡', '模', '敢', '粗', '施', '系', '懐', '往', '鮮', '携', '弧', '納'];
  private lesson7Kanji = ['括', '芽', '削', '克', '微', '嫌', '紛', '頑', '槽'];
  private allKanji = this.lesson2Kanji.concat(this.lesson3Kanji, this.lesson4Kanji, this.lesson5Kanji, this.lesson6Kanji);

  constructor(private userKanjiService: UserKanjiService,
              private dialog: MatDialog,
              private route: ActivatedRoute,
              private formBuilder: UntypedFormBuilder,
              private spinner: SpinnerService) {
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
  }

  filterUserKanji() {
    this.spinner.open();
    const filter = this.userKanjiService.generateFilter(this.searchForm.value);
    this.userKanjiService.filterUserKanji(filter).pipe(take(1)).subscribe(res => {
      //res = res.filter(e => !this.allKanji.includes(e.kanji.kanji))
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
