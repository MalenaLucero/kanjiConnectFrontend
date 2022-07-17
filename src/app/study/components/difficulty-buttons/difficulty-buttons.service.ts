import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DifficultyButtonsService {

  constructor() { }

  getNewDifficulty(difficulty: number): number {
    return difficulty + 1;
  }
}
