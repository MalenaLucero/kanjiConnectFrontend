import { CreateExpressionDto, FilterExpressionsDto } from '../../models/expression.model';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { FormExpressionDto } from 'src/app/study/models/expression.model';
import { ExpressionsService } from 'src/app/study/services/expressions.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { takeWhile } from 'rxjs/operators';
import { SpinnerService } from 'src/app/shared/components/spinner/spinner.service';

@Component({
  selector: 'app-upload-expression',
  templateUrl: './upload-expression.component.html',
  styleUrls: ['./upload-expression.component.scss']
})
export class UploadExpressionComponent implements OnInit {
  private user: string;

  constructor(private snackBar: MatSnackBar,
              private expressionsService: ExpressionsService,
              private authService: AuthService,
              private spinner: SpinnerService) {
                this.user = this.authService.getUserId();
              }

  ngOnInit(): void {
    this.authService.user$.pipe(takeWhile(e => e._id.length === 0, true)).subscribe(
      res => this.user = res._id
    )
  }

  getFormData(formExpression: FormExpressionDto) {
    const expressionToUpload: CreateExpressionDto = {
      ...formExpression,
      user: this.user,
      kanjis: [],
      difficulty: 5,
      created: new Date(),
      updated: new Date()
    }
    const token = localStorage.getItem('token');
    if (!token) {
      this.snackBar.open(`You're not logged in`, 'Error', { duration: 3000 });
    } else {
      this.spinner.open();
      this.expressionsService.getExpressionsByUser().subscribe({
        next: res => {
          const expressionFound = res.find(expression => expression.word === expressionToUpload.word);
          if (expressionFound === undefined) {
            this.expressionsService.create(expressionToUpload)
            .subscribe({
              next: res => {
                this.snackBar.open('Expression created', 'OK', { duration: 3000 });
                this.spinner.close();
              }, error: err => {
                this.snackBar.open(`Expression couldn't be created`, err.error.message, { duration: 3000 });
                this.spinner.close();
              }
            })
          } else {
            this.snackBar.open('Expression already exists', 'Error', { duration: 3000 });
            this.spinner.close();
          }
        }
      });
    }
  }
}
