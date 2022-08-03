import { ConfirmDeleteData } from './../../../shared/models/confirm.model';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeleteConfirmService } from 'src/app/shared/components/delete-confirm/delete-confirm.service';
import { SpinnerService } from 'src/app/shared/components/spinner/spinner.service';
import { Tag } from '../../models/tag.model';
import { TagsService } from '../../services/tags.service';

@Component({
  selector: 'app-manage-tags',
  templateUrl: './manage-tags.component.html',
  styleUrls: ['./manage-tags.component.scss']
})
export class ManageTagsComponent implements OnInit {
  public tags: Tag[] = [];

  constructor(private tagsService: TagsService,
              private snackBar: MatSnackBar,
              private spinner: SpinnerService,
              private deleteConfirmService: DeleteConfirmService) { }

  ngOnInit(): void {
    this.tagsService.tags$.subscribe(
      res => {
        this.tags = res;
      }
    )
  }

  deleteTag(tag: Tag) {
    const deleteData: ConfirmDeleteData = {
      name: tag.name,
      type: 'tag',
      id: tag._id
    }
    this.deleteConfirmService.openDialog(deleteData)
      .subscribe(res => {
        if (typeof res === 'string') {
          this.spinner.open();
          this.tagsService.deleteTag(res).subscribe({
            next: res => {
              this.snackBar.open(res.name + ' tag deleted', 'OK', { duration: 3000 });
              this.spinner.close();
              this.tagsService.getTags();
            }, error: err => {
              this.snackBar.open(`Tag couldn't be deleted`, err.error.message, { duration: 3000 });
              this.spinner.close();
            }
          });
        }
      });
  }

}
