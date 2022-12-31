import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { emptyTag, FormTag, Tag } from '../../models/tag.model';

@Component({
  selector: 'app-tag-card',
  templateUrl: './tag-card.component.html',
  styleUrls: ['./tag-card.component.scss']
})
export class TagCardComponent implements OnInit {
  public editMode = false;
  private url = 'https://kanji-connect.vercel.app/study/manage';
  public tagExpressionsLink: string = '';
  public tagUserKanjiLink: string = '';

  @Input() tag: Tag = emptyTag;
  @Output() tagToDelete = new EventEmitter<Tag>();
  @Output() tagToEdit = new EventEmitter<Tag>();

  constructor() { }

  ngOnInit(): void {
    this.tagExpressionsLink = this.url + '/expressions?filter=tags:' + this.tag._id;
    this.tagUserKanjiLink = this.url + '/user-kanji?filter=tags:' + this.tag._id;
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
