import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { emptyTag, FormTag, Tag } from '../../models/tag.model';
import { LinksService } from '../../services/links.service';

@Component({
  selector: 'app-tag-card',
  templateUrl: './tag-card.component.html',
  styleUrls: ['./tag-card.component.scss']
})
export class TagCardComponent implements OnInit {
  public editMode = false;
  public links: { title: string, link: string}[] = [];

  @Input() tag: Tag = emptyTag;
  @Output() tagToDelete = new EventEmitter<Tag>();
  @Output() tagToEdit = new EventEmitter<Tag>();

  constructor(private linksService: LinksService) { }

  ngOnInit(): void {
    this.links = [
      {
        title: `Tag's expressions`,
        link: this.linksService.filterExpressionsByTag(this.tag._id),
      }, {
        title: `Tag's kanji`,
        link: this.linksService.filterUserKanjiByTag(this.tag._id),
      }
    ]
  }

  deleteTag() {
    this.tagToDelete.emit(this.tag);
  }

  editTag(event: FormTag) {
    this.editMode = false;
    const updatedTag: Tag = { ...this.tag, ...event };
    this.tagToEdit.emit(updatedTag);
  }

}
