import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UpdateUserKanjiDto, UserKanji, UserKanjiFilter } from '../models/user-kanji.model';
import { BehaviorSubject } from 'rxjs';
import { TagsService } from './tags.service';
import { GenericFilter } from '../models/query-search.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { DataFetchingService } from 'src/app/shared/services/data-fetching.service';

@Injectable({
  providedIn: 'root'
})
export class UserKanjiService {
  private user: string;
  private userKanjiFilter = new BehaviorSubject<UserKanji[]>([]);
  userKanjiFilter$ = this.userKanjiFilter.asObservable();

  constructor(private http: HttpClient,
              private tagsService: TagsService,
              private authService: AuthService,
              private dataFetchingService: DataFetchingService) {
                this.user = this.authService.getUserId();
              }

  filterUserKanji(filter: UserKanjiFilter | GenericFilter) {
    filter.user = this.user;
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

  update(id: string, data: UpdateUserKanjiDto, showSpinner = true) {
    if (showSpinner) {
      this.dataFetchingService.openSpinner();
    }
    return this.http.put<UserKanji>(environment.userKanjiPrivate + '/' + id, data);
  }

  notFoundUserKanji(filter: GenericFilter, userKanji: UserKanji[]): string[] {
    const notFound: string[] = [];
    if (filter.searchList && filter.searchList.length > 0) {
      const { searchList } = filter;
      const foundKanji = userKanji.map(userKanji => userKanji.kanji.kanji);
      searchList.forEach(kanji => {
        if (!foundKanji.includes(kanji)) {
          notFound.push(kanji)
        }
      })
      return notFound;
    }
    return notFound;
  }
}
