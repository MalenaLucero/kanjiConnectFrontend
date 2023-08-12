import { Component, Input, OnInit } from '@angular/core';
import { emptyExpression, Expression } from '../../models/expression.model';
import { ExternalLinksService } from '../../services/external-links.service';

@Component({
  selector: 'app-expression-card-editable',
  templateUrl: './expression-card-editable.component.html',
  styleUrls: ['./expression-card-editable.component.scss']
})
export class ExpressionCardEditableComponent implements OnInit {
  @Input() expression: Expression = emptyExpression;
  public externalLinks: { title: string, link: string }[] = [];

  constructor(private externalLinksService: ExternalLinksService) { }

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

}
