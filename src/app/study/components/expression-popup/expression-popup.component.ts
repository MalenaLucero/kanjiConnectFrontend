import { Expression } from 'src/app/study/models/expression.model';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-expression-popup',
  templateUrl: './expression-popup.component.html',
  styleUrls: ['./expression-popup.component.scss']
})
export class ExpressionPopupComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public expression: Expression) { }

  ngOnInit(): void {

  }

}
