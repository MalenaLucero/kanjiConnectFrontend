import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpressionCardComponent } from './expression-card.component';

describe('ExpressionCardComponent', () => {
  let component: ExpressionCardComponent;
  let fixture: ComponentFixture<ExpressionCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpressionCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpressionCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
