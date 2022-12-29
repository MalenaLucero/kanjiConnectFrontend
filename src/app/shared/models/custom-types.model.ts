export type DataType = 'expression' | 'user-kanji';

export type FetchedDataState = 'loaded' | 'loading' | 'no data' | 'init';

export type CardDifficultyLevel = 'easy' | 'OK' | 'hard';

export type CardFlipState = 'front' | 'back';

export type Transitivity = 'transitive' | 'intransitive' | null;

export type Jlpt = 1 | 2 | 3 | 4 | 5 | null;

export const minJlpt = 1;

export const maxJlpt = 5;

export type Grade = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | null;

export type Difficulty = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export type DifficultyText = 'Very hard' | 'Hard' | 'Medium' | 'Easy' | 'Very easy';
