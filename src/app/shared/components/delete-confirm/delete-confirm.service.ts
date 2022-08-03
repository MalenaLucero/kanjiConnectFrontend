import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ConfirmDeleteData } from '../../models/confirm.model';
import { DeleteConfirmComponent } from './delete-confirm.component';

@Injectable({
  providedIn: 'root'
})
export class DeleteConfirmService {

  constructor(public dialog: MatDialog) { }

  openDialog(data: ConfirmDeleteData): Observable<false | string> {
    const dialogRef = this.dialog.open(DeleteConfirmComponent, {
      width: '300px',
      data: data,
    });

    return dialogRef.afterClosed();
  }
}
