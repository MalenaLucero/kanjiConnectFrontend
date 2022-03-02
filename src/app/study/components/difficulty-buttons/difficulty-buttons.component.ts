import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CardDifficultyLevel, Difficulty } from 'src/app/shared/models/custom-types.model';

@Component({
  selector: 'app-difficulty-buttons',
  templateUrl: './difficulty-buttons.component.html',
  styleUrls: ['./difficulty-buttons.component.scss']
})
export class DifficultyButtonsComponent implements OnInit {
  @Input() difficulty: Difficulty | null = null;
  @Output() updatedDifficulty = new EventEmitter<Difficulty>();

  constructor(private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  updateDifficulty(cardDifficulty: CardDifficultyLevel, difficulty: number | null) {
    if (difficulty === null || !Number.isInteger(difficulty) || difficulty < 0 || difficulty > 10) {
      this.snackBar.open('Invalid difficulty', 'Error', { duration: 3000 });
    } else {
      const newDifficulty = this.setNewDifficulty(cardDifficulty, difficulty);
      this.updatedDifficulty.emit(newDifficulty);
    }
  }

  setNewDifficulty(cardDifficulty: CardDifficultyLevel, difficulty: number): Difficulty {
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
