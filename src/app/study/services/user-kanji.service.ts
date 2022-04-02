import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TableKanji, UserKanji, UserKanjiFilter } from '../models/user-kanji.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserKanjiService {
  private user = '61478fb9b2cfde16186509b5';
  private userKanji = new BehaviorSubject<TableKanji[]>([]);
  userKanji$ = this.userKanji.asObservable();

  constructor(private http: HttpClient) { }

  getUserKanjiByUser() {
    const filter = {
      user: this.user,
      jlpt: 1
    }
    return this.http.post<UserKanji[]>(environment.userKanji + '/filter', filter)
      .subscribe(
        res => {
          const tableKanji = res.map((userKanji, index) => {
            return {
              kanji: userKanji.kanji ? userKanji.kanji.kanji : 'VACIO',
              kun_readings: userKanji.kanji.kun_readings,
              on_readings: userKanji.kanji.on_readings,
              expressions: userKanji.expressions.map(expression => expression.word),
              number: index + 1
            }
          })
          this.userKanji.next(tableKanji);
        }
      )
  }

  filterUserKanji(filter: UserKanjiFilter) {
    return this.http.post<UserKanji[]>(environment.userKanji + '/filter', filter);
  }
}
