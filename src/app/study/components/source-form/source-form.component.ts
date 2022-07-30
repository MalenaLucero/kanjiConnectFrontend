import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { emptyLesson, Lesson } from '../../models/lesson.model';
import { FormSource } from '../../models/source.model';
import { LessonsService } from '../../services/lessons.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-source-form',
  templateUrl: './source-form.component.html',
  styleUrls: ['./source-form.component.scss']
})
export class SourceFormComponent implements OnInit {
  public sourceForm: FormGroup;
  public currentLesson: Lesson = emptyLesson;

  @Output() formData = new EventEmitter<FormSource>();
  @Input() set updatedLesson(value: Lesson) {
    this.currentLesson = value;
  }

  constructor(private formBuilder: FormBuilder,
              private lessonsService: LessonsService) {
    this.sourceForm = this.formBuilder.group({
      lessonId: [''],
      name: [''],
      link: ['']
    })
    this.sourceForm.get('lessonId')?.valueChanges.subscribe(lessonId => {
      this.lessonsService.lessons$.pipe(take(1)).subscribe(res => {
        this.currentLesson = res.find(lesson => lesson._id === lessonId) || emptyLesson;
      })
    })
  }

  ngOnInit(): void {}

  addSource() {
    this.formData.emit(this.sourceForm.value);
  }

}
