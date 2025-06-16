import { Jlpt } from 'src/app/shared/models/custom-types.model';
import { Card } from './card.model';
import { Difficulty } from "../../shared/models/custom-types.model";
import { Expression } from "./expression.model";
import { emptyKanji, Kanji } from "./kanji.model";
import { emptyUser, User } from "../../shared/models/user.model";

export interface UserKanji {
  difficulty: Difficulty,
  expressions: Expression[],
  kanji: Kanji,
  created: Date,
  updated: Date,
  user: User,
  _id: string,
  notes: string,
}

export interface UpdateUserKanjiDto extends Partial<UserKanji> {}

export interface UserKanjiFilter {
  user: string,
  difficulty?: Difficulty,
  lesson?: string,
  tags?: string[],
  jlpt?: Jlpt,
  kanjiAsCharacter?: string,
  kanjiList?: string[],
  startIndex?: number,
}

export const emptyUserKanji: UserKanji = {
  difficulty: 5,
  expressions: [],
  kanji: emptyKanji,
  created: new Date,
  updated: new Date,
  user: emptyUser,
  _id: '',
  notes: '',
}

export interface TableKanji {
  kanji: string;
  expressions: string[];
  on_readings: string[];
  kun_readings: string[];
  number: number;
}

export const emptyTableKanji: TableKanji = {
  kanji: '',
  expressions: [],
  on_readings: [],
  kun_readings: [],
  number: 0
}
