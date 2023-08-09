import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SpinnerService } from 'src/app/shared/components/spinner/spinner.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FormTag, UploadTag } from '../../models/tag.model';
import { TagsService } from '../../services/tags.service';

@Component({
  selector: 'app-upload-tag',
  templateUrl: './upload-tag.component.html',
  styleUrls: ['./upload-tag.component.scss']
})
export class UploadTagComponent implements OnInit {
  private user: string;

  constructor(private tagsService: TagsService,
              private snackBar: MatSnackBar,
              private spinner: SpinnerService,
              private authService: AuthService) {
                this.user = this.authService.getUserId()
              }

  ngOnInit(): void {
  }

  uploadTag(event: FormTag){
    this.spinner.open();
    const data: UploadTag = {...event, user: this.user};
    this.tagsService.uploadTag(data).subscribe({
      next: res => {
        this.snackBar.open('Tag created', 'OK', { duration: 3000 });
        this.spinner.close();
        this.tagsService.getTags();
      }, error: err => {
        this.snackBar.open(`Tag couldn't be created`, err.error.message, { duration: 3000 });
        this.spinner.close();
      }
    });
   }

}
