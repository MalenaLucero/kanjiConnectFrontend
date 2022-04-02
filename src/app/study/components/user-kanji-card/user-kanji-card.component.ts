import { TableKanji, emptyTableKanji } from './../../models/user-kanji.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-kanji-card',
  templateUrl: './user-kanji-card.component.html',
  styleUrls: ['./user-kanji-card.component.scss']
})
export class UserKanjiCardComponent implements OnInit {
  @Input() cardData: TableKanji = emptyTableKanji;

  constructor() { }

  ngOnInit(): void {

  }

}
