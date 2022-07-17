import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadExpressionComponent } from './upload-expression.component';

xdescribe('UploadComponent', () => {
  let component: UploadExpressionComponent;
  let fixture: ComponentFixture<UploadExpressionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadExpressionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadExpressionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
