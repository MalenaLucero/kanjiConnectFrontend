import { Injectable } from '@angular/core';
import { maxJlpt, minJlpt } from '../models/custom-types.model';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor() { }

  isJlptValid(jlptLevel: number | null): boolean {
    if (jlptLevel === null) {
      return false;
    }
    if (jlptLevel >= minJlpt && jlptLevel <= maxJlpt) {
      return true;
    }
    return false;
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
