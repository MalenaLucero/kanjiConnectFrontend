import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewCardComponent } from './review-card.component';

xdescribe('ExpressionCardComponent', () => {
  let component: ReviewCardComponent;
  let fixture: ComponentFixture<ReviewCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
