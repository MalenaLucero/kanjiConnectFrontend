import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { emptyTag, Tag } from '../../models/tag.model';

@Component({
  selector: 'app-tag-card',
  templateUrl: './tag-card.component.html',
  styleUrls: ['./tag-card.component.scss']
})
export class TagCardComponent implements OnInit {
  @Input() tag: Tag = emptyTag;
  @Output() id = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  deleteTag() {
    this.id.emit(this.tag._id);
  }

}
