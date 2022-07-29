import { MatSnackBar } from '@angular/material/snack-bar';
import { emptyLesson, FormLesson, Lesson } from './../../models/lesson.model';
import { Component, OnInit } from '@angular/core';
import { LessonsService } from '../../services/lessons.service';
import { SpinnerService } from 'src/app/shared/components/spinner/spinner.service';

@Component({
  selector: 'app-upload-lesson',
  templateUrl: './upload-lesson.component.html',
  styleUrls: ['./upload-lesson.component.scss']
})
export class UploadLessonComponent implements OnInit {
  private user = '61478fb9b2cfde16186509b5';
  private uploadedLesson: Lesson = emptyLesson;

  constructor(private lessonsService: LessonsService,
              private spinner: SpinnerService,
              private snackBar: MatSnackBar) {}

  ngOnInit(): void {
  }

  uploadLesson(event: FormLesson) {
    const lesson = { ...event, user: this.user };
    this.spinner.open();
    this.lessonsService.uploadLesson(lesson)
      .subscribe({
        next: res => {
          this.uploadedLesson = res;
          this.snackBar.open('Lesson created', 'OK', { duration: 3000 });
          this.spinner.close();
        }, error: err => {
          this.snackBar.open(`Lesson couldn't be created`, err.error.message, { duration: 3000 });
          this.spinner.close();
        }
      });
  }
}
