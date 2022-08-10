import { FormLesson } from './../../models/lesson.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { DeleteConfirmService } from 'src/app/shared/components/delete-confirm/delete-confirm.service';
import { SpinnerService } from 'src/app/shared/components/spinner/spinner.service';
import { ConfirmDeleteData } from 'src/app/shared/models/confirm.model';
import { Lesson } from '../../models/lesson.model';
import { LessonsService } from '../../services/lessons.service';

@Component({
  selector: 'app-manage-lessons',
  templateUrl: './manage-lessons.component.html',
  styleUrls: ['./manage-lessons.component.scss']
})
export class ManageLessonsComponent implements OnInit {
  public lessons: Lesson[] = [];
  public filteredLessons: Lesson[] = [];
  public filteredYear: number | null = null;
  constructor(private lessonsService: LessonsService,
              private deleteConfirmService: DeleteConfirmService,
              private spinner: SpinnerService,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.lessonsService.lessons$.subscribe(res => {
      res.shift();
      this.lessons = res;
      this.filteredLessons = res;
    });
  }

  filterLessons(filter: number | 'reverse' | 'all') {
    switch(filter) {
      case 2021:
        this.filteredLessons = this.lessons.filter(lesson => lesson.date.toString().substring(0, 4) === '2021');
        this.filteredYear = 2021;
        break;
      case 2022:
        this.filteredLessons = this.lessons.filter(lesson => lesson.date.toString().substring(0, 4) === '2022');
        this.filteredYear = 2022;
        break;
      case 'reverse':
        this.filteredLessons.reverse();
        break;
      case 'all':
        this.filteredLessons = this.lessons;
        this.filteredYear = null;
        break;
    }
  }

  deleteLesson(lesson: Lesson) {
    const deleteData: ConfirmDeleteData = {
      name: lesson.topic,
      type: 'lesson',
      id: lesson._id
    }
    this.deleteConfirmService.openDialog(deleteData)
    .subscribe(confirmResponse => {
      if (typeof confirmResponse === 'string') {
        this.spinner.open();
        this.lessonsService.deleteLesson(confirmResponse).subscribe({
          next: res => {
            this.snackBar.open(res.topic + ' lesson deleted', 'OK', { duration: 3000 });
            this.spinner.close();
            this.lessonsService.getLessons();
          }, error: err => {
            this.snackBar.open(`Lesson couldn't be deleted`, err.error.message, { duration: 3000 });
            this.spinner.close();
          }
        });
      }
    });
  }

  editLesson(event: Lesson) {
    this.spinner.open();
    const editedLesson: FormLesson = {
      topic: event.topic,
      link: event.link,
      date: event.date
    }
    this.lessonsService.updateLesson(event._id, editedLesson)
      .subscribe({
        next: res => {
          this.snackBar.open(res.topic + ' lesson edited', 'OK', { duration: 3000 });
          this.spinner.close();
          this.lessonsService.getLessons();
        }, error: err => {
          this.snackBar.open(`Lesson couldn't be edited`, err.error.message, { duration: 3000 });
          this.spinner.close();
        }
      })
  }
}
