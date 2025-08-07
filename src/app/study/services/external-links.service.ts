import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExternalLinksService {
  private jishoBaseUrl = 'https://jisho.org';
  private appBaseUrl = 'https://kanji-connect.vercel.app';

  constructor() { }

  expressionEnglishDefinition(word: string) {
    return this.jishoBaseUrl + '/search/' + word;
  }

  expressionJishoExampleSentences(word: string) {
    return this.jishoBaseUrl + '/search/' + word + '%20%23sentences';
  }

  expressionSubtitleExampleSentences(word: string) {
    return this.appBaseUrl + '/study/search?words=' + word;
  }

  expressionsContainingKanji(kanji: string) {
    return this.jishoBaseUrl + '/search/*' + kanji + '*';
  }

  kanjiDetails(kanji: string) {
    return this.jishoBaseUrl + '/search/' + kanji + '%20%23kanji'
  }
}
