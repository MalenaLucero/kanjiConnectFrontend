import { Jlpt } from "../../shared/models/custom-types.model";

interface OnyomiGroup {
  grapheme: string,
  members: string[],
  onyomi: string[],
  exceptional_onyomi: null | string[],
  _id: string,
}

interface KunyomiGroup {
  kunyomi: string,
  meaning: string,
  members: string[],
  _id: string,
}

interface LookalikeGroup {
  members: string[],
  _id: string
}

export interface Kanji {
  kanji: string,
  on_readings: string[],
  kun_readings: string[],
  meanings: string[],
  grade: number,
  jlpt: Jlpt,
  kunyomiGroups: null | KunyomiGroup[],
  lookalikeGroups: null | LookalikeGroup[],
  onyomiGroups: null | OnyomiGroup[],
  _id: string,
}

export const emptyKanji = {
  kanji: '',
  on_readings: [],
  kun_readings: [],
  meanings: [],
  grade: 0,
  jlpt: null,
  kunyomiGroups: null,
  lookalikeGroups: null,
  onyomiGroups: null,
  _id: '',
}
