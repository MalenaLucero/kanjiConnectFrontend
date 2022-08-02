import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
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
              private spinner: SpinnerService) { }

  ngOnInit(): void {
    this.tagsService.tags$.subscribe(
      res => {
        this.tags = res;
      }
    )
  }

  deleteTag(id: string) {
    this.spinner.open();
    this.tagsService.deleteTag(id).subscribe({
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

}
