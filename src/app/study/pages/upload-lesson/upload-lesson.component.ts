import { MatSnackBar } from '@angular/material/snack-bar';
import { emptyLesson, FormLesson, Lesson } from './../../models/lesson.model';
import { Component, OnInit } from '@angular/core';
import { LessonsService } from '../../services/lessons.service';
import { SpinnerService } from 'src/app/shared/components/spinner/spinner.service';
import { FormSource, UploadSource } from '../../models/source.model';

@Component({
  selector: 'app-upload-lesson',
  templateUrl: './upload-lesson.component.html',
  styleUrls: ['./upload-lesson.component.scss']
})
export class UploadLessonComponent implements OnInit {
  private user = '61478fb9b2cfde16186509b5';
  private uploadedLesson: Lesson = emptyLesson;
  public updatedLesson: Lesson = emptyLesson;

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
          this.lessonsService.getLessons();
        }, error: err => {
          this.snackBar.open(`Lesson couldn't be created`, err.error.message, { duration: 3000 });
          this.spinner.close();
        }
      });
  }

  uploadSource(event: FormSource) {
    this.spinner.open();
    const sourceData: UploadSource = {
      name: event.name,
      link: event.link
    }
    this.lessonsService.uploadSourceToLesson(event.lessonId, sourceData)
      .subscribe({
        next: res => {
          this.updatedLesson = res;
          this.spinner.close();
          this.snackBar.open('Lesson updated', 'OK', { duration: 3000 });
        }, error: err => {
          this.snackBar.open(`Lesson couldn't be updated`, err.error.message, { duration: 3000 });
          this.spinner.close();
        }
      })
  }
}
