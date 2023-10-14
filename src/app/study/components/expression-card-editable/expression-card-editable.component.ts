import { Component, Input, OnInit } from '@angular/core';
import { emptyExpression, Expression, UpdateExpressionDto } from '../../models/expression.model';
import { ExternalLinksService } from '../../services/external-links.service';
import { ExpressionsService } from '../../services/expressions.service';
import { DataFetchingService } from 'src/app/shared/services/data-fetching.service';
import { TagsService } from '../../services/tags.service';
import { LinksService } from '../../services/links.service';
import { Difficulty } from 'src/app/shared/models/custom-types.model';

@Component({
  selector: 'app-expression-card-editable',
  templateUrl: './expression-card-editable.component.html',
  styleUrls: ['./expression-card-editable.component.scss']
})
export class ExpressionCardEditableComponent implements OnInit {
  @Input() expression: Expression = emptyExpression;
  public externalLinks: { title: string, link: string }[] = [];
  public showNotesInput = false;
  public showTagsInput = false;
  public showDifficultyInput = false;
  public expressionTags: string[] = [];
  public expressionKanjis: string[] = [];
  public expressionKanjisLink: string = '';

  constructor(private externalLinksService: ExternalLinksService,
              private linksService: LinksService, 
              private expressionsService: ExpressionsService,
              private dataFetchingService: DataFetchingService,
              private tagsService: TagsService) { }

  ngOnInit(): void {
    this.expressionTags = this.expression.populatedTags.map(e => e.name);
    this.expressionKanjis = this.expression.populatedKanjis.map(e => e.kanji);
    this.expressionKanjisLink = this.linksService.filterUserKanjiByKanjiList(this.expressionKanjis.join(','));
    this.externalLinks = [
      {
        title: 'Jisho.org definition',
        link: this.externalLinksService.expressionEnglishDefinition(this.expression.word),
      }, {
        title: 'Japanese definition',
        link: this.externalLinksService.expressionJapaneseDefinition(this.expression.word),
      }, {
        title: 'More example sentences',
        link: this.externalLinksService.expressionExampleSentences(this.expression.word),
      }
    ]
  }

  updateNote(event: string) {
    if (event === 'cancel') {
      this.showNotesInput = false;
    } else {
      this.expressionsService.update(this.expression._id, { notes: event }).subscribe({
        next: res => {
          this.dataFetchingService.defaultSuccessBehaviour('Notes updated successfully');
          this.showNotesInput = false;
          this.expression.notes = res.notes;
        }, error: () => this.dataFetchingService.defaultErrorBehaviour()
      })
    }
  }

  updateTags(event: { [key: string]: boolean } | 'cancel') {
    if(event === 'cancel') {
      this.showTagsInput = false;
    } else {
      const tagNames = Object.keys(event).filter(key => event[key]).map(key => key);
      const tags = this.tagsService.getTagsFromTagNames(tagNames);
      this.updateExpression({tags: tags}, 'Tags');
    }
  }

  updateDifficulty(event: Difficulty | 'cancel') {
    if (event === 'cancel') {
      this.showDifficultyInput = false;
    } else {
      this.expressionsService.update(this.expression._id, { difficulty: event }).subscribe({
        next: res => {
          this.dataFetchingService.defaultSuccessBehaviour('Difficulty updated successfully');
          this.showDifficultyInput = false;
          this.expression.difficulty = res.difficulty;
        }, error: () => this.dataFetchingService.defaultErrorBehaviour()
      })
    }
  }

  updateExpression(objToUpdate: UpdateExpressionDto, updatedProperty: string) {
    this.expressionsService.update(this.expression._id, objToUpdate).subscribe({
      next: res => {
        this.dataFetchingService.defaultSuccessBehaviour(updatedProperty + ' updated successfully');
        this.showNotesInput = false;
        this.showTagsInput = false;
        this.expression.tags = res.tags;
        this.expression.populatedTags = this.tagsService.getTagsFromTagIds(res.tags);
        this.expressionTags = this.expression.populatedTags.map(e => e.name);
      }, error: () => this.dataFetchingService.defaultErrorBehaviour()
    })
  }
}
