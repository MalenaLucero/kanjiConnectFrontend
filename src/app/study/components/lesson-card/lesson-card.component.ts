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

  constructor() { }

  ngOnInit(): void {
  }

  deleteLesson() {
    this.outputLesson.emit(this.lesson);
  }

}
