import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-lesson-form',
  templateUrl: './lesson-form.component.html',
  styleUrls: ['./lesson-form.component.scss']
})
export class LessonFormComponent implements OnInit {
  public lessonForm: FormGroup;
  @Output() formData = new EventEmitter();

  constructor(private formBuilder: FormBuilder) {
    this.lessonForm = this.formBuilder.group({
      topic: [''],
      link: [''],
      date: ['']
    })
  }

  ngOnInit(): void {
  }

  uploadLesson() {
    this.formData.emit(this.lessonForm.value);
  }
}
