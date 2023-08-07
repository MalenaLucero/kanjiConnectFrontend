import { Component, Input } from '@angular/core';
import { UserKanji, emptyUserKanji } from '../../models/user-kanji.model';

@Component({
  selector: 'app-user-kanji-card-readonly',
  templateUrl: './user-kanji-card-readonly.component.html',
  styleUrls: ['./user-kanji-card-readonly.component.scss']
})
export class UserKanjiCardReadonlyComponent {
  @Input() userKanji: UserKanji = emptyUserKanji;

}
