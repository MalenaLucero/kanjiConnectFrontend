import { Component, Input, OnInit } from '@angular/core';
import { emptyExpression, Expression } from '../../models/expression.model';
import { ExternalLinksService } from '../../services/external-links.service';
import { ExpressionsService } from '../../services/expressions.service';
import { DataFetchingService } from 'src/app/shared/services/data-fetching.service';

@Component({
  selector: 'app-expression-card-editable',
  templateUrl: './expression-card-editable.component.html',
  styleUrls: ['./expression-card-editable.component.scss']
})
export class ExpressionCardEditableComponent implements OnInit {
  @Input() expression: Expression = emptyExpression;
  public externalLinks: { title: string, link: string }[] = [];
  public showNotesInput = false;

  constructor(private externalLinksService: ExternalLinksService,
              private expressionsService: ExpressionsService,
              private dataFetchingService: DataFetchingService) { }

  ngOnInit(): void {
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

}
