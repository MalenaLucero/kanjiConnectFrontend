import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }

  getLinesWithIncludedWords(words: string) {
    return this.http.get<any>(environment.subtitles + '/filter?words=' + words);
  }

  getAllAnime() {
    return this.http.get<any>(environment.subtitles + '/anime/all');
  }
}
