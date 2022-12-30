import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewCompletedComponent } from './review-completed.component';

describe('ReviewCompletedComponent', () => {
  let component: ReviewCompletedComponent;
  let fixture: ComponentFixture<ReviewCompletedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewCompletedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewCompletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
