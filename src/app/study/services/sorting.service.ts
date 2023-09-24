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

  sortByTagCombination(expressions: Expression[]): { tagCombination: Tag[], expressions: Expression[] }[] {
    const maxNumberOfTagCombinations = Math.max(...expressions.map(expression => expression.tags).map(e => e.length));
    if (maxNumberOfTagCombinations > 0) {
      const tagCombinations: any = {};
      for(let i = 0; i < maxNumberOfTagCombinations; i++) {
        tagCombinations[(i + 1).toString()] = [];
      }
      expressions.forEach(expression => {
        if (expression.tags.length > 0) {
          tagCombinations[expression.tags.length].push(expression.tags);
        }
      })
      const flattenedTagCombinations: string[][] = [];
      Object.keys(tagCombinations).forEach(key => {
        if (tagCombinations[key].length > 0) {
          const uniqueValues: string[][] = this.getArrayOfUniqueValues(tagCombinations[key]);
          uniqueValues.forEach(arr => flattenedTagCombinations.push(arr));
        }
      })
      return this.matchTagCombinationsWithExpressions(flattenedTagCombinations, expressions);
    } else {
      return [];
    }
  }

  matchTagCombinationsWithExpressions(tagCombinations: string[][], expressions: Expression[]): { tagCombination: Tag[], expressions: Expression[] }[] {
    const returnValue = tagCombinations.map((tagCombination: string[]) => {
      const expressionsWithTagCombination = expressions.filter(expression =>
        expression.tags.length === tagCombination.length &&
        expression.tags.every(tag => tagCombination.includes(tag))
      )
      const tagsData = expressionsWithTagCombination[0]?.populatedTags;
      return {
        tagCombination: tagsData,
        expressions: expressionsWithTagCombination,
      }
    }).filter((e: any) => e.expressions.length > 0);
    return this.sortByNumberOfTags(returnValue);
  }

  areTwoArraysEqual<T>(arr1: T[], arr2: T[]): boolean {
    if (arr1.length !== arr2.length) {
      return false;
    } else {
      let areEqual = true;
      arr1.forEach((e: T) => {
        if (!arr2.includes(e)) areEqual = false;
      })
      return areEqual;
    }
  }

  isArrayIncludedInListOfArrays<T>(arr: T[], arrays: T[][]): boolean {
    let isIncluded = false;
    let acc = 0;
    while(!isIncluded && acc < arrays.length) {
      if (this.areTwoArraysEqual(arrays[acc], arr)) {
        isIncluded = true;
      }
      acc++;
    }
    return isIncluded;
  }

  getArrayOfUniqueValues<T>(arr: T[][]): T[][] {
    if (arr.length === 0) {
      return [];
    } 
    const uniqueValues = [arr[0]];
    for(let i = 1; i < arr.length; i++) {
      if (!this.isArrayIncludedInListOfArrays(arr[i], uniqueValues)) {
        uniqueValues.push(arr[i]);
      }
    }
    return uniqueValues;
  }
}
