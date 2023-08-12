import { FormLesson } from './../../models/lesson.model';
import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { emptyLesson, Lesson } from '../../models/lesson.model';
import { LinksService } from '../../services/links.service';

@Component({
  selector: 'app-lesson-card',
  templateUrl: './lesson-card.component.html',
  styleUrls: ['./lesson-card.component.scss']
})
export class LessonCardComponent implements OnInit {
  @Input() lesson: Lesson = emptyLesson;
  @Output() outputLesson = new EventEmitter<Lesson>();
  @Output() lessonToEdit = new EventEmitter<Lesson>();

  public editMode = false;
  public links: { title: string, link: string}[] = []

  constructor(private linksService: LinksService) { }

  ngOnInit(): void {
    this.links = [
      {
        title: `Lesson's expressions`,
        link: this.linksService.filterExpressionsByLesson(this.lesson._id)
      }, {
        title: `Lesson's kanji`,
        link: this.linksService.filterUserKanjiByLesson(this.lesson._id)
      }
    ]
  }

  deleteLesson() {
    this.outputLesson.emit(this.lesson);
  }

  editLesson(event: FormLesson) {
    this.editMode = true;
    const editedLesson = { ...this.lesson, ...event };
    this.lessonToEdit.emit(editedLesson);
  }
}
