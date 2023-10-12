import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LinksService {
  private appBaseUrl = 'https://kanji-connect.vercel.app';

  constructor() { }

  searchExpression(word: string) {
    return this.appBaseUrl + '/study/manage/expressions?search=' + word;
  }

  filterExpressionsByLesson(id: string) {
    return this.appBaseUrl + '/study/manage/expressions?filter=lesson:' + id;
  }

  filterExpressionsByTag(id: string) {
    return this.appBaseUrl + '/study/manage/expressions?filter=tags:' + id;
  }

  filterUserKanjiByKanjiList(kanjiList: string) {
    return this.appBaseUrl + '/study/manage/user-kanji?search=' + kanjiList;
  }

  filterUserKanjiByLesson(id: string) {
    return this.appBaseUrl + '/study/manage/user-kanji?filter=lesson:' + id;
  }

  filterUserKanjiByTag(id: string) {
    return this.appBaseUrl + '/study/manage/user-kanji?filter=tags:' + id;
  }
}
