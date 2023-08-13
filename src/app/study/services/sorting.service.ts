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

  sortByTagCombination(arr: Expression[]): { tagCombination: Tag[], expressions: Expression[] }[] {
    const tagList = arr.map(expression => expression.tags);
    const maxNumberOfTagsPerExpression = Math.max(...tagList.map(e => e.length));
    const concatTags: string[] = [];
    tagList.forEach(list => list.forEach(tag => concatTags.push(tag)));
    const tagsWithNoRepetitions = Array.from(new Set(concatTags));
    let twoTagsCombinations = [];
    let threeTagsCombinations = [];
    let fourTagsCombinations = [];
    let allPossibleTagCombinations: any = [];

    if (maxNumberOfTagsPerExpression > 0) {
      allPossibleTagCombinations = [...tagsWithNoRepetitions].map(e => [e]);
    }

    if (maxNumberOfTagsPerExpression > 1) {
      for (let j = 0; j < tagsWithNoRepetitions.length; j++) {
        const combinations = [];
        for(let k = j + 1; k < tagsWithNoRepetitions.length; k++) {
          const newArray = [tagsWithNoRepetitions[j], tagsWithNoRepetitions[k]]
          combinations.push(newArray)
        }
        allPossibleTagCombinations = allPossibleTagCombinations.concat(combinations);
        if (combinations.length > 0) {
          twoTagsCombinations.push(combinations)
        }
      }
    }
    
    const aux = allPossibleTagCombinations.map((tagCombination: string[]) => {
      const expressionsWithTagCombination = arr.filter(expression =>
        expression.tags.length === tagCombination.length &&
        expression.tags.every(tag => tagCombination.includes(tag))
      )
      const tagsData = expressionsWithTagCombination[0]?.populatedTags;
      return {
        tagCombination: tagsData,
        expressions: expressionsWithTagCombination,
      }
    }).filter((e: any) => e.expressions.length > 0);
    allPossibleTagCombinations = this.sortByNumberOfTags(aux)
    
    return allPossibleTagCombinations;
  }

}
