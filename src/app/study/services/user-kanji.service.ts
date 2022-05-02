import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserKanji, UserKanjiFilter } from '../models/user-kanji.model';
import { BehaviorSubject } from 'rxjs';
import { TagsService } from './tags.service';

@Injectable({
  providedIn: 'root'
})
export class UserKanjiService {
  private user = '61478fb9b2cfde16186509b5';
  private userKanjiFilter = new BehaviorSubject<UserKanji[]>([]);
  userKanjiFilter$ = this.userKanjiFilter.asObservable();

  constructor(private http: HttpClient,
              private tagsService: TagsService) { }

  filterUserKanji(filter: UserKanjiFilter) {
    return this.http.post<UserKanji[]>(environment.userKanji + '/filter', filter);
  }

  setUserKanjiFilter(data: UserKanji[]) {
    this.userKanjiFilter.next(data);
  }

  generateFilter(data: any): UserKanjiFilter {
    const { kanjiList, jlpt, lesson, tags } = data;
    const cleanFilter: UserKanjiFilter = { user: this.user };
    if (kanjiList.includes(',')) {
      cleanFilter.kanjiList = kanjiList.split(',');
    } else if (kanjiList.length > 0) {
      cleanFilter.kanjiAsCharacter = kanjiList;
    } else {
      if (jlpt !== null) cleanFilter.jlpt = data.jlpt
      if (lesson.length > 0) cleanFilter.lesson = lesson
      let tagNames: string[] = Object.keys(tags).filter(key => tags[key] === true).map(key => key);
      if (tagNames.length > 0) cleanFilter.tags = this.tagsService.getTagIdsFromNames(tagNames);
    }
    return cleanFilter;
  }
}
