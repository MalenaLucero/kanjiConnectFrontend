import { UserKanji } from './../models/user-kanji.model';
import { Injectable } from '@angular/core';
import { Expression } from '../models/expression.model';
import { Tag } from '../models/tag.model';
import { DifficultyText } from 'src/app/shared/models/custom-types.model';
import { DifficultyService } from './difficulty.service';

@Injectable({
  providedIn: 'root'
})
export class SortingService {

  constructor(private difficultyService: DifficultyService) { }

  sortTagsByColor(tags: Tag[]) {
    return tags.sort((a, b) => a.color < b.color ? -1 : 1);
  }

  sortByDifficulty(arr: Expression[] | UserKanji[]) {
    return arr.sort((a, b) => a.difficulty > b.difficulty ? -1 : 1);
  }

  sortByDifficultyText(arr: Expression[]): { difficultyText: DifficultyText, list: Expression[] }[] {
    const availableDifficultyText = this.difficultyService.getDifficultyTextAsArray();
    const response: { difficultyText: DifficultyText, list: Expression[] }[] = availableDifficultyText.map(text => {
      return { difficultyText: text, list: [] }
    })
    arr.forEach((element: Expression) => {
      const difficultyText = this.difficultyService.getDifficultyTextFromDifficultyLevel(element.difficulty);
      response.find(obj => {
        if (obj.difficultyText === difficultyText) {
          obj.list.push(element)
        }
      })
    })
    return response;
  }

  sortByNumberOfTags(arr: { tagCombination: Tag[], expressions: Expression[]}[]) {
    return arr.sort((a, b) => a.tagCombination.length < b.tagCombination.length ? -1 : 1);
  }

  sortKanjiByJlptLevel(arr: UserKanji[]) {
    const nullArrElements = arr.filter(e => e.kanji.jlpt === null);
    const arrWithoutNull = arr.filter(e => e.kanji.jlpt !== null);
    arrWithoutNull.sort((a, b) => {
      if (a.kanji.jlpt !== null && b.kanji.jlpt !== null && a.kanji.jlpt < b.kanji.jlpt) {
        return -1
      } else {
        return 1;
      }
    })
    return arrWithoutNull.concat(nullArrElements);
  }

}
