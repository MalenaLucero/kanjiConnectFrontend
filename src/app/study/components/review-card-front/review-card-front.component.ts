import { emptyCard } from './../../models/card.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Card } from '../../models/card.model';

@Component({
  selector: 'app-review-card-front',
  templateUrl: './review-card-front.component.html',
  styleUrls: ['./review-card-front.component.scss']
})
export class ReviewCardFrontComponent implements OnInit {
  public showHint: boolean = false;

  @Output() showReverse = new EventEmitter();
  @Input() cardData: Card = emptyCard;
  @Input() total: number = 0;
  @Input() currentIndex: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

  reverseCard() {
    this.showReverse.emit();
  }
}

