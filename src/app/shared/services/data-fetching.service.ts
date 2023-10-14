import { Injectable } from '@angular/core';
import { SpinnerComponent } from '../components/spinner/spinner.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class DataFetchingService {

  constructor(private dialog: MatDialog,
              private snack: MatSnackBar) { }

  openSpinner() {
    this.dialog.open(SpinnerComponent, {
      width: '250px',
      height: '250px',
    });
  }

  closeSpinner() {
    this.dialog.closeAll()
  }

  openSuccessSnack(message: string = 'Action successfully completed', action: string = 'Success', duration: number = 3000) {
    this.snack.open(message, action, { duration });
  }

  openErrorSnack(message: string = 'An error ocurred', action: string = 'Try again', duration: number = 3000) {
    this.snack.open(message, action, { duration });
  }

  defaultErrorBehaviour(message: string = 'An error ocurred', action: string = 'Unauthorized', duration: number = 3000) {
    this.closeSpinner();
    this.openErrorSnack(message, action, duration);
  }

  defaultSuccessBehaviour(message: string = 'Action successfully completed', action: string = 'Success', duration: number = 3000) {
    this.closeSpinner();
    this.openSuccessSnack(message, action, duration);
  }
}
