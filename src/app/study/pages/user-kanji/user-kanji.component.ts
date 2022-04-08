import { TableKanji } from './../../models/user-kanji.model';
import { Component, OnInit } from '@angular/core';
import { UserKanjiService } from '../../services/user-kanji.service';
import { MatDialog } from '@angular/material/dialog';
import { ExpressionPopupComponent } from '../../components/expression-popup/expression-popup.component';
import { ExpressionsService } from '../../services/expressions.service';
import { emptyExpression, Expression } from '../../models/expression.model';
import { pipe, take } from 'rxjs';

@Component({
  selector: 'app-user-kanji',
  templateUrl: './user-kanji.component.html',
  styleUrls: ['./user-kanji.component.scss']
})
export class UserKanjiComponent implements OnInit {
  userKanji: TableKanji[] = [];
  columnTitles = ['number', 'kanji', 'expressions', 'kun_readings', 'on_readings'];
  areCardsShown: boolean = true;
  cardData: TableKanji[] = [];
  lesson2Kanji = ['臨','透','揺','染','芝','尽','哀','護','岐','帳','潜','腐'];

  constructor(private userKanjiService: UserKanjiService,
              private expressionsService: ExpressionsService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.userKanjiService.userKanji$.subscribe(res => {
      this.userKanji = res;
      this.cardData = res.filter(data => this.lesson2Kanji.includes(data.kanji));
    })
    if(this.userKanji.length === 0) {
      this.userKanjiService.getUserKanjiByUser();
      this.userKanjiService.userKanji$.subscribe(res => {
        this.userKanji = res
        this.cardData = res.filter(data => this.lesson2Kanji.includes(data.kanji));
      })
    }
    this.expressionsService.expressions$.pipe(take(1)).subscribe(res => {
      if(res.length === 0) {
        this.expressionsService.getExpressionsByUser();
      }
    })

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
