import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExternalLinksService {
  private jishoBaseUrl = 'https://jisho.org';
  private gooBaseUrl = 'https://dictionary.goo.ne.jp';

  constructor() { }

  expressionEnglishDefinition(word: string) {
    return this.jishoBaseUrl + '/search/' + word;
  }

  expressionJapaneseDefinition(word: string) {
    return this.gooBaseUrl + '/srch/all/' + word + '/m0u/';
  }

  expressionExampleSentences(word: string) {
    return this.jishoBaseUrl + '/search/' + word + '%20%23sentences';
  }

  expressionsContainingKanji(kanji: string) {
    return this.jishoBaseUrl + '/search/*' + kanji + '*';
  }

  kanjiDetails(kanji: string) {
    return this.jishoBaseUrl + '/search/' + kanji + '%20%23kanji'
  }
}
