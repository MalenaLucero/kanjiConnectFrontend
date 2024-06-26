import { Expression } from 'src/app/study/models/expression.model';
import { UserKanji, emptyUserKanji } from 'src/app/study/models/user-kanji.model';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ExternalLinksService } from '../../services/external-links.service';
import { UserKanjiService } from '../../services/user-kanji.service';
import { DataFetchingService } from 'src/app/shared/services/data-fetching.service';
import { Difficulty } from 'src/app/shared/models/custom-types.model';

@Component({
  selector: 'app-user-kanji-card-editable',
  templateUrl: './user-kanji-card-editable.component.html',
  styleUrls: ['./user-kanji-card-editable.component.scss']
})
export class UserKanjiCardEditableComponent implements OnInit {
  @Input() cardData: UserKanji = emptyUserKanji;
  @Output() expressionToOutput = new EventEmitter<Expression>();
  public externalLinks: { title: string, link: string}[] = [];
  public showNotesInput = false;
  public showDifficultyInput = false;
  public isUserKanji = false;

  constructor(private externalLinksService: ExternalLinksService,
              private userKanjiService: UserKanjiService,
              private dataFetchingService: DataFetchingService) { }

  ngOnInit(): void {
    if (this.cardData.hasOwnProperty('_id')) {
      this.isUserKanji = true;
    }
    this.externalLinks = [
      {
        title: 'More kanji details',
        link: this.externalLinksService.kanjiDetails(this.cardData.kanji.kanji),
      }, {
        title: 'Words containing this kanji',
        link: this.externalLinksService.expressionsContainingKanji(this.cardData.kanji.kanji),
      }, {
        title: 'Kanji groups',
        link: 'https://kanji-connect.vercel.app/study/kanji-groups?kanji=' + this.cardData.kanji.kanji,
      },
    ]
  }

  outputExpression(expression: Expression) {
    this.expressionToOutput.emit(expression);
  }

  updateNote(event: string) {
    if (event === 'cancel') {
      this.showNotesInput = false;
    } else {
      this.userKanjiService.update(this.cardData._id, { notes: event }).subscribe({
        next: (res: UserKanji) => {
          this.dataFetchingService.defaultSuccessBehaviour('Notes updated successfully');
          this.showNotesInput = false;
          this.cardData.notes = res.notes;
        }, error: () => this.dataFetchingService.defaultErrorBehaviour()
      })
    }
  }

  updateDifficulty(event: Difficulty | 'cancel') {
    if (event === 'cancel') {
      this.showDifficultyInput = false;
    } else {
      this.userKanjiService.update(this.cardData._id, { difficulty: event }).subscribe({
        next: res => {
          this.dataFetchingService.defaultSuccessBehaviour('Difficulty updated successfully');
          this.showDifficultyInput = false;
          this.cardData.difficulty = res.difficulty;
        }, error: () => this.dataFetchingService.defaultErrorBehaviour()
      })
    }
  }

}
