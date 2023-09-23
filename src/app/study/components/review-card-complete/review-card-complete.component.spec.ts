import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewCardCompleteComponent } from './review-card-complete.component';

xdescribe('ReviewCardCompleteComponent', () => {
  let component: ReviewCardCompleteComponent;
  let fixture: ComponentFixture<ReviewCardCompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewCardCompleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewCardCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
