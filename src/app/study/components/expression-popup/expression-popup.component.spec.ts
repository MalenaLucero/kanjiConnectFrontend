import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpressionPopupComponent } from './expression-popup.component';

describe('ExpressionPopupComponent', () => {
  let component: ExpressionPopupComponent;
  let fixture: ComponentFixture<ExpressionPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpressionPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpressionPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
