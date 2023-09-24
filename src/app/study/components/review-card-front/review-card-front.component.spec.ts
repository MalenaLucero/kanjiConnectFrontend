import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewCardFrontComponent } from './review-card-front.component';

xdescribe('ReviewCardFrontComponent', () => {
  let component: ReviewCardFrontComponent;
  let fixture: ComponentFixture<ReviewCardFrontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewCardFrontComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewCardFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
