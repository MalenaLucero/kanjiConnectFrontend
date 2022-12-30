import { UserKanji } from './../models/user-kanji.model';
import { Injectable } from '@angular/core';
import { Expression } from '../models/expression.model';
import { Tag } from '../models/tag.model';

@Injectable({
  providedIn: 'root'
})
export class SortingService {

  constructor() { }

  sortTagsByColor(tags: Tag[]) {
    return tags.sort((a, b) => a.color < b.color ? -1 : 1);
  }

  sortByDifficulty(arr: Expression[] | UserKanji[]) {
    return arr.sort((a, b) => a.difficulty > b.difficulty ? -1 : 1);
  }

  sortByNumberOfTags(arr: { tagCombination: Tag[], expressions: Expression[]}[]) {
    return arr.sort((a, b) => a.tagCombination.length < b.tagCombination.length ? -1 : 1);
  }

}
