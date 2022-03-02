import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CardDifficultyLevel, Difficulty } from 'src/app/shared/models/custom-types.model';

@Component({
  selector: 'app-difficulty-buttons',
  templateUrl: './difficulty-buttons.component.html',
  styleUrls: ['./difficulty-buttons.component.scss']
})
export class DifficultyButtonsComponent {
  @Input() difficulty: Difficulty | null = null;
  //shadowing cambiar nombre
  @Output() updatedDifficultyEmitter = new EventEmitter<Difficulty>();

  constructor(private snackBar: MatSnackBar) { }

  updateDifficulty(cardDifficulty: CardDifficultyLevel) {
    if (this.difficulty === null || !Number.isInteger(this.difficulty) || this.difficulty < 0 || this.difficulty > 10) {
      this.snackBar.open('Invalid difficulty', 'Error', { duration: 3000 });
    } else {
      const newDifficulty = this.setNewDifficulty(cardDifficulty);
      this.updatedDifficultyEmitter.emit(newDifficulty);
    }
  }

  setNewDifficulty(cardDifficulty: CardDifficultyLevel): Difficulty {
    const difficulty = this.difficulty as number;
    if (cardDifficulty === 'easy') {
      const newDifficulty = difficulty - 2
      return newDifficulty < 0 ? 0 : newDifficulty as Difficulty;
    } else if (cardDifficulty === 'OK') {
      const newDifficulty = difficulty - 1
      return newDifficulty < 0 ? 0 : newDifficulty as Difficulty;
    } else {
      const newDifficulty = difficulty + 1
      return newDifficulty > 10 ? 10 : newDifficulty as Difficulty;
    }
  }
}
