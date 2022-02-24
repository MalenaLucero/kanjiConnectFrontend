import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tag } from '../models/tag.model';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
import { filter, map, take, takeWhile } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TagsService {
  private user = '61478fb9b2cfde16186509b5';
  private tags = new BehaviorSubject<Tag[]>([]);
  tags$ = this.tags.asObservable();

  constructor(private http: HttpClient) { }

  getTagsByUser(user: string) {
    return this.http.get<Tag[]>(environment.tags + '/user/' + user);
  }

  getTags() {
    this.http.get<Tag[]>(environment.tags + '/user/' + this.user).subscribe(
      res => {
        this.tags.next(res);
      }
    )
  }

  setTags(value: Tag[]) {
    this.tags.next(value);
  }

  getTagIds(tagNames: string[]) {
    let tagIds: string[] = []
    this.tags$.pipe(
        take(1),
        map(tags => {
          return tags.filter((tag: Tag) => tagNames.includes(tag.name))
                      .map((tag: Tag) => tag._id)
        }))
      .subscribe(res => tagIds = res)
    return tagIds;
  }
}
