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
  public englishDefinitionLink: string = '';
  public japaneseDefinitionLink: string = '';
  public exampleSentencesLink: string = '';

  constructor(private externalLinksService: ExternalLinksService) { }

  ngOnInit(): void {
    this.englishDefinitionLink = this.externalLinksService.expressionEnglishDefinition(this.expression.word);
    this.japaneseDefinitionLink = this.externalLinksService.expressionJapaneseDefinition(this.expression.word);
    this.exampleSentencesLink = this.externalLinksService.expressionExampleSentences(this.expression.word);
  }

}
