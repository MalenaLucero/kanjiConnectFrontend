import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ExpandedKanji } from '../models/expanded-kanji.model';

@Injectable({
  providedIn: 'root'
})
export class KanjiService {

  constructor(private http: HttpClient) { }

  getExpandedKanji(kanji: string) {
    return this.http.get<ExpandedKanji | 'Kanji not found'>(environment.kanjis + '/' + kanji);
  }
}
