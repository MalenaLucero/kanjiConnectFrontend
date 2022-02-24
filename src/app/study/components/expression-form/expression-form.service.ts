import { Injectable } from '@angular/core';
import { FormExpressionDto } from '../../models/expression.model';
import { TagsService } from '../../services/tags.service';

@Injectable({
  providedIn: 'root'
})
export class ExpressionFormService {

  constructor(private tagsService: TagsService) { }

  getRandomJapaneseExpression(previousExpression: string | null): string {
    const expressions = ['周囲', '理解', 'お屋敷', '地味', '仕事', '整頓', '主人', 'お客様', '好み', '調味料', '食材', '掃除', '気分'];
    const randomExpression = expressions[Math.floor(Math.random()*expressions.length)];
    if (randomExpression !== previousExpression) {
      return randomExpression
    } else {
      return this.getRandomJapaneseExpression(previousExpression);
    }
  }

  generateFormExpressionObject(rawFormObject: any): FormExpressionDto {
    const formExpressionObject: FormExpressionDto = {
        word: rawFormObject.word,
        reading: rawFormObject.reading,
        englishMeaning: this.generateMeaningArray(rawFormObject.englishMeaning),
        japaneseMeaning: this.generateMeaningArray(rawFormObject.japaneseMeaning),
        exampleSentences: rawFormObject.exampleSentences.filter((e: any) => e.sentence !== null && e.sentence.length !== 0),
        tags: this.tagsService.getTagIds(this.getCheckedTagNames(rawFormObject.tags)),
        lesson: rawFormObject.lesson,
        jlpt: rawFormObject.jlpt,
        transitivity: rawFormObject.transitivity,
    }
    return formExpressionObject;
  }

  generateMeaningArray(formArrayData: { meaning: string }[]): string[] {
    return formArrayData.map(e => e.meaning).filter(e => e !== null && e.length !== 0)
  }

  getCheckedTagNames(tagsObject: any): string[] {
    return Object.keys(tagsObject).filter(key => tagsObject[key] === true)
  }
}
