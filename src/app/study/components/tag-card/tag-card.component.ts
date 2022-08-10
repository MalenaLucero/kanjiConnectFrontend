import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { emptyTag, FormTag, Tag } from '../../models/tag.model';

@Component({
  selector: 'app-tag-card',
  templateUrl: './tag-card.component.html',
  styleUrls: ['./tag-card.component.scss']
})
export class TagCardComponent implements OnInit {
  public editMode = false;
  @Input() tag: Tag = emptyTag;
  @Output() tagToDelete = new EventEmitter<Tag>();
  @Output() tagToEdit = new EventEmitter<Tag>();

  constructor() { }

  ngOnInit(): void {
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
