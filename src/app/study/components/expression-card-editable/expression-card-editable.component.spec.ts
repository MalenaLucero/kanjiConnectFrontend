import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpressionCardEditableComponent } from './expression-card-editable.component';

xdescribe('ExpressionCardEditableComponent', () => {
  let component: ExpressionCardEditableComponent;
  let fixture: ComponentFixture<ExpressionCardEditableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpressionCardEditableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpressionCardEditableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
