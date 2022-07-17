import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageExpressionsComponent } from './manage-expressions.component';

xdescribe('ManageExpressionsComponent', () => {
  let component: ManageExpressionsComponent;
  let fixture: ComponentFixture<ManageExpressionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageExpressionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageExpressionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
