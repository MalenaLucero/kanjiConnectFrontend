import { Component, Input, OnInit } from '@angular/core';
import { emptyExpression, Expression } from '../../models/expression.model';

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

  constructor() { }

  ngOnInit(): void {
    const word = this.expression.word;
    this.englishDefinitionLink = `https://jisho.org/search/${word}`;
    this.japaneseDefinitionLink = `https://dictionary.goo.ne.jp/srch/all/${word}/m0u/`;
    this.exampleSentencesLink = `https://jisho.org/search/${word}%20%23sentences`;
  }

}
