import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpressionCardReadonlyComponent } from './expression-card-readonly.component';

xdescribe('ExpressionCardReadonlyComponent', () => {
  let component: ExpressionCardReadonlyComponent;
  let fixture: ComponentFixture<ExpressionCardReadonlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpressionCardReadonlyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpressionCardReadonlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
