import { FormLesson } from './../../models/lesson.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-lesson-form',
  templateUrl: './lesson-form.component.html',
  styleUrls: ['./lesson-form.component.scss']
})
export class LessonFormComponent implements OnInit {
  public lessonForm: FormGroup;
  public submitText: string = 'Create lesson';
  @Output() formData = new EventEmitter();
  @Output() cancel = new EventEmitter<boolean>();
  @Input() formInput: FormLesson | null = null;
  @Input() resetText: string = 'Clean form';

  constructor(private formBuilder: FormBuilder) {
    this.lessonForm = this.formBuilder.group({
      topic: [''],
      link: [''],
      date: ['']
    })
  }

  ngOnInit(): void {
    if (this.formInput !== null) {
      this.submitText = 'Edit lesson';
      this.resetText = 'Cancel';
      this.lessonForm.get('topic')?.setValue(this.formInput.topic);
      this.lessonForm.get('link')?.setValue(this.formInput.link);
      this.lessonForm.get('date')?.setValue(this.formInput.date);
    }
  }

  submit() {
    this.formData.emit(this.lessonForm.value);
  }

  reset() {
    this.lessonForm.reset();
    this.cancel.emit(true);
  }
}
