import { FormLesson } from './../../models/lesson.model';
import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { emptyLesson, Lesson } from '../../models/lesson.model';

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
  private url = 'https://kanji-connect.vercel.app/study/manage';
  public lessonExpressionsLink: string = '';
  public lessonUserKanjiLink: string = '';


  constructor() { }

  ngOnInit(): void {
    this.lessonExpressionsLink = this.url + '/expressions?filter=lesson:' + this.lesson._id;
    this.lessonUserKanjiLink = this.url + '/user-kanji?filter=lesson:' + this.lesson._id;
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
