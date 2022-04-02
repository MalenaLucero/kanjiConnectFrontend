import { TableKanji } from './../../models/user-kanji.model';
import { Component, OnInit } from '@angular/core';
import { UserKanjiService } from '../../services/user-kanji.service';

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

  constructor(private userKanjiService: UserKanjiService) { }

  ngOnInit(): void {
    this.userKanjiService.userKanji$.subscribe(res => {
      this.userKanji = res;
      this.cardData = res.slice(0, 12);
    })
    if(this.userKanji.length === 0) {
      this.userKanjiService.getUserKanjiByUser();
      this.userKanjiService.userKanji$.subscribe(res => {
        this.userKanji = res
        this.cardData = res.slice(0, 12);
      })
    }
  }

  showCards() {
    this.areCardsShown = true;
  }

  showTable() {
    this.areCardsShown = false;
  }
}
