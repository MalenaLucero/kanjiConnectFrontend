import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmDeleteData } from '../../models/confirm.model';

@Component({
  selector: 'app-delete-confirm',
  templateUrl: './delete-confirm.component.html',
  styleUrls: ['./delete-confirm.component.scss']
})
export class DeleteConfirmComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteConfirmComponent>,
              @Inject(MAT_DIALOG_DATA) public data: ConfirmDeleteData,) { }

  ngOnInit(): void {

  }

  cancel() {
    this.dialogRef.close(false);
  }

  confirmDelete() {
    this.dialogRef.close(this.data.id);
  }

}
