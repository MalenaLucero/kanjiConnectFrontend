import { Injectable } from '@angular/core';
import { Difficulty, DifficultyText } from 'src/app/shared/models/custom-types.model';

@Injectable({
  providedIn: 'root'
})
export class DifficultyService {

  constructor() { }

  getDifficultyTextAsArray(): DifficultyText[] {
    return ['Very hard', 'Hard',  'Medium',  'Easy', 'Very easy'];
  }

  getDifficultyTextFromDifficultyLevel(difficulty: Difficulty): DifficultyText | null {
    if (difficulty > 8) {
      return 'Very hard';
    } else if (difficulty === 7 || difficulty === 8) {
      return 'Hard';
    } else if (difficulty > 3 && difficulty < 7) {
      return 'Medium';
    } else if (difficulty == 3 || difficulty == 2) {
      return 'Easy';
    } else if (difficulty < 2) {
      return 'Very easy';
    } else {
      return null;
    }
  }
}
