import { Injectable } from '@angular/core';
import { Expression } from '../../models/expression.model';
import { UserKanji } from '../../models/user-kanji.model';
import { DataType } from 'src/app/shared/models/custom-types.model';
import { ReviewCardPopupComponent } from './review-card-popup.component';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class ReviewCardPopupService {

  constructor(private dialog: MatDialog) { }

  open(reviewData: Expression[] | UserKanji[], type: DataType): void {
    this.dialog.open(ReviewCardPopupComponent, {
      width: '400px',
      height: '80vh',
      data: { reviewData, type }
    });
  }
}
