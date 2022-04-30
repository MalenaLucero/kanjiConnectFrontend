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
  private userKanjiFilter = new BehaviorSubject<UserKanji[]>([]);
  userKanjiFilter$ = this.userKanjiFilter.asObservable();

  constructor(private http: HttpClient) { }

  filterUserKanji(filter: UserKanjiFilter) {
    return this.http.post<UserKanji[]>(environment.userKanji + '/filter', filter);
  }

  setUserKanjiFilter(data: UserKanji[]) {
    this.userKanjiFilter.next(data);
  }
}
