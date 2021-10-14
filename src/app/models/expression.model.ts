import { ExampleSentence } from "./example-sentence.model";

export interface Expression {
  word: string;
  reading: string;
  englishMeaning: string[];
  japaneseMeaning: string[];
  exampleSentences: ExampleSentence[];
  tags: string[];
  lesson: string;
  user: string;
  kanjis: string[];
  difficulty: number;
  created: Date;
  updated: Date;
  _id: string;
}

export interface ExternalExpression {
  word: string,
  reading: string,
  englishMeaning: string[],
  jlpt: number | null,
  transitivity: 'transitive' | 'intransitive' | null;
}

export class ExternalExpressionInitializer {
  word = ''
  reading = ''
  englishMeaning = ['']
  jlpt = null
  transitivity = null
}

export interface FormExpressionDto extends Omit<Expression,
  'user' | 'kanjis' | 'difficulty' | 'created' | 'updated' | '_id'> {}

export interface CreateExpressionDto extends Omit<Expression, '_id'> {}

export interface UpdateExpressionDto extends Partial<CreateExpressionDto> {}

export interface FilterExpressionsDto {
  user: string;
  tags?: string[];
  lesson?: string;
  difficulty?: number;
}

export class ExpressionInitializer {
  word = ''
  reading = ''
  englishMeaning = ['']
  japaneseMeaning = ['']
  exampleSentences = [{
    sentence: '',
    source: '',
    link: '',
    _id: ''
  }]
  tags = ['']
  lesson = ''
  user = ''
  kanjis = ['']
  difficulty = 5
  created = new Date()
  updated = new Date()
  _id = ''
}
