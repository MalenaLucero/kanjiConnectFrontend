import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewCardBackComponent } from './review-card-back.component';

describe('ReviewCardBackComponent', () => {
  let component: ReviewCardBackComponent;
  let fixture: ComponentFixture<ReviewCardBackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewCardBackComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewCardBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
