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
  public lessonExpressionsLink: string = '';
  public lessonUserKanjiLink: string = '';


  constructor(private linksService: LinksService) { }

  ngOnInit(): void {
    this.lessonExpressionsLink = this.linksService.filterExpressionsByLesson(this.lesson._id);
    this.lessonUserKanjiLink = this.linksService.filterUserKanjiByLesson(this.lesson._id);
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
