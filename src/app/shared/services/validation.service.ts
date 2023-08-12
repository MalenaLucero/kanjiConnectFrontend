import { Injectable } from '@angular/core';
import { jlptLevels, difficultyLevels } from '../models/custom-types.model';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor() { }

  isJlptValid(jlptLevel: number | null): boolean {
    if (jlptLevel === null) {
      return false;
    }
    if (jlptLevels.includes(jlptLevel)) {
      return true;
    }
    return false;
  }

  isDifficultyArrayValid(difficultyArray: number[]): boolean {
    if (difficultyArray.some(e => !difficultyLevels.includes(e))) {
      return false;
    }
    return true;
  }

  isMongoIdValid(mongoId: string): boolean {
    if (mongoId.length === 24) {
      return true;
    }
    return false;
  }

  isValidationArrayValid(validationArray: boolean[]): boolean {
    if (validationArray.some(val => val === false)) {
      return false;
    }
    return true;
  }
}
