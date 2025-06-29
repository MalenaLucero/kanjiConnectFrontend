import { Card } from './card.model';
import { Difficulty, Jlpt, Transitivity } from '../../shared/models/custom-types.model';
import { ExampleSentence } from "./example-sentence.model";
import { Tag } from './tag.model';
import { Kanji } from './kanji.model';

export interface Expression {
  word: string;
  reading: string;
  englishMeaning: string[];
  japaneseMeaning: string[];
  exampleSentences: ExampleSentence[];
  tags: string[];
  populatedTags: Tag[],
  lesson: string;
  user: string;
  kanjis: string[];
  populatedKanjis: Kanji[],
  jlpt: Jlpt;
  transitivity: Transitivity;
  difficulty: Difficulty;
  created: Date;
  updated: Date;
  _id: string;
  notes: string;
  stringSearchLink: string;
}

export interface ExternalExpression {
  word: string,
  reading: string,
  englishMeaning: string[],
  jlpt: Jlpt,
  transitivity: Transitivity
}

export class ExternalExpressionInitializer {
  word = ''
  reading = ''
  englishMeaning = []
  jlpt = null
  transitivity = null
}

export interface FormExpressionDto extends Omit<Expression,
  'user' | 'kanjis' | 'difficulty' | 'created' | 'updated' | '_id'> {}

export interface CreateExpressionDto extends Omit<Expression, '_id'> {}

export interface UpdateExpressionDto {
  reading?: string;
  englishMeaning?: string[];
  japaneseMeaning?: string[];
  tags?: Tag[];
  jlpt?: Jlpt;
  transitivity?: Transitivity;
  difficulty?: Difficulty;
  updated?: Date;
  notes?: string;
}

export interface FilterExpressionsDto {
  user: string;
  tags?: string[];
  lesson?: string;
  difficulty?: Difficulty;
  jlpt?: Jlpt;
  startIndex?: number;
}


export const emptyExpression: Expression = {
  word: '',
  reading: '',
  englishMeaning: [''],
  japaneseMeaning: [''],
  exampleSentences: [{
    sentence: '',
    source: '',
    link: '',
    _id: ''
  }],
  tags: [''],
  populatedTags: [],
  lesson: '',
  user: '',
  kanjis: [''],
  populatedKanjis: [],
  difficulty: 5,
  jlpt: null,
  transitivity: null,
  created: new Date(),
  updated: new Date(),
  _id: '',
  notes: '',
  stringSearchLink: '',
}
