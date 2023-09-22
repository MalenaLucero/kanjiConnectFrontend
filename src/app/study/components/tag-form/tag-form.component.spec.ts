import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagFormComponent } from './tag-form.component';

xdescribe('TagFormComponent', () => {
  let component: TagFormComponent;
  let fixture: ComponentFixture<TagFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TagFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TagFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
