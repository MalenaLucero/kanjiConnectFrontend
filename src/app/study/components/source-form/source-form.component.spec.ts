import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SourceFormComponent } from './source-form.component';

xdescribe('SourceFormComponent', () => {
  let component: SourceFormComponent;
  let fixture: ComponentFixture<SourceFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SourceFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SourceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
