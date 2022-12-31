import { emptyCard } from './../../models/card.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Card } from '../../models/card.model';
import { Difficulty } from 'src/app/shared/models/custom-types.model';

@Component({
  selector: 'app-review-card-back',
  templateUrl: './review-card-back.component.html',
  styleUrls: ['./review-card-back.component.scss']
})
export class ReviewCardBackComponent implements OnInit {
  @Input() cardData: Card = emptyCard;
  @Output() sendDifficulty = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

  updateDifficulty(newDifficulty: Difficulty) {
    this.sendDifficulty.emit(newDifficulty)
  }

}
