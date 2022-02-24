import { TestBed } from '@angular/core/testing';
import { RAW_FORM_EXPRESSION, TAG_IDS } from 'data/raw-form-expression';
import { TagsService } from '../../services/tags.service';

import { ExpressionFormService } from './expression-form.service';

describe('ExpressionFormService', () => {
  let service: ExpressionFormService;
  let tagsService: any;

  beforeEach(() => {
    const tagsServiceSpy = jasmine.createSpyObj('TagsService', ['getTagIds'])
    TestBed.configureTestingModule({
      providers: [{ provide: TagsService, useValue: tagsServiceSpy}]
    })
    service = TestBed.inject(ExpressionFormService);
    tagsService = TestBed.inject(TagsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a different random expression than the one passed as parameter', () => {
    const previousExpression = '周囲';
    const randomExpression = service.getRandomJapaneseExpression(previousExpression)
    expect(randomExpression !== previousExpression).toBe(true);
  })

  it('should return a valid expression when passed an empty string as parameter', () => {
    const previousExpression = '';
    const randomExpression = service.getRandomJapaneseExpression(previousExpression)
    expect(randomExpression !== previousExpression).toBe(true);
    expect(randomExpression.length > 0).toBe(true);
  })

  it('should return a valid expression when passed null as parameter', () => {
    const previousExpression = null;
    const randomExpression = service.getRandomJapaneseExpression(previousExpression)
    expect(randomExpression !== previousExpression).toBe(true);
    expect(randomExpression.length > 0).toBe(true);
  })

  it('should return a valid object to upload', () => {
    tagsService.getTagIds.and.returnValue(TAG_IDS);
    const formExpressionObject = service.generateFormExpressionObject(RAW_FORM_EXPRESSION);
    expect(formExpressionObject).toBeTruthy()
    expect(formExpressionObject.word.length > 0).withContext('Invalid word').toBe(true);
    expect(formExpressionObject.hasOwnProperty('reading')).withContext('Missing property reading').toBe(true);
    expect(Array.isArray(formExpressionObject.englishMeaning)).withContext('Invalid englishMeaning array').toBe(true);
    expect(Array.isArray(formExpressionObject.japaneseMeaning)).withContext('Invalid japaneseMeaning array').toBe(true);
    expect(Array.isArray(formExpressionObject.tags)).withContext('Invalid tags array').toBe(true);
    expect(formExpressionObject.hasOwnProperty('lesson')).withContext('Missing property lesson').toBe(true);
    expect(formExpressionObject.hasOwnProperty('jlpt')).withContext('Missing property jlpt').toBe(true);
    expect(formExpressionObject.hasOwnProperty('transitivity')).withContext('Missing property transitivity').toBe(true);
  })

  it('should return an array of non-empty strings or an empty array', () => {
    const formArrayData = RAW_FORM_EXPRESSION.englishMeaning;
    const meaningArray = service.generateMeaningArray(formArrayData);
    expect(typeof meaningArray[0]).withContext('Element of meaning array should be string').toBe('string');
    expect(meaningArray.includes('')).withContext('Empty strings included in meaning array').toBe(false); 

    const emptyFormArrayData = RAW_FORM_EXPRESSION.japaneseMeaning;
    const emptyMeaningArray = service.generateMeaningArray(emptyFormArrayData);
    expect(emptyMeaningArray.length).withContext('Expected empty array').toBe(0);
  })

  it('should return checked tag names as an array of strings', () => {
    const checkboxGroupTagsObject = RAW_FORM_EXPRESSION.tags;
    const output = service.getCheckedTagNames(checkboxGroupTagsObject);
    const expectedOutput = ['Suga'];
    expect(output).toEqual(expectedOutput);
  })
});
