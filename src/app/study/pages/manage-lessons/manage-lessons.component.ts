import { Component, OnInit } from '@angular/core';
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
  constructor(private lessonsService: LessonsService) { }

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
}
