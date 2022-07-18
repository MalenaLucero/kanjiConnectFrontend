import { Component, Input, OnInit } from '@angular/core';
import { emptyExpression, Expression } from '../../models/expression.model';

@Component({
  selector: 'app-expression-card',
  templateUrl: './expression-card.component.html',
  styleUrls: ['./expression-card.component.scss']
})
export class ExpressionCardComponent implements OnInit {
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
