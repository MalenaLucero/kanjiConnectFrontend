import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { emptyLesson, FormLesson, Lesson, loadingLesson } from '../models/lesson.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UploadSource } from '../models/source.model';


@Injectable({
  providedIn: 'root'
})

export class LessonsService {
  private user = '61478fb9b2cfde16186509b5';
  private lessons = new BehaviorSubject<Lesson[]>([loadingLesson]);
  lessons$ = this.lessons.asObservable();

  constructor(private http: HttpClient,
              private authService: AuthService) { }

  getLessonsByUser(user: string) {
    return this.http.get<Lesson[]>(environment.lessons + '/user/' + user);
  }

  getLessons() {
    this.http.get<Lesson[]>(environment.lessons + '/user/' + this.user).subscribe(
      res => {
        res.unshift(emptyLesson);
        this.lessons.next(res)
      }
    )
  }

  uploadLesson(data: FormLesson) {
    return this.http.post<Lesson>(environment.lessons, data);
  }

  uploadSourceToLesson(lessonId: string, sourceData: UploadSource) {
    return this.http.put<Lesson>(environment.lessons + '/source/' + lessonId, sourceData);
  }

  deleteLesson(id: string) {
    return this.http.delete<Lesson>(environment.lessons + '/' + id);
  }

  updateLesson(id: string, data: FormLesson) {
    return this.http.put<Lesson>(environment.lessons + '/' + id, data);
  }
}
