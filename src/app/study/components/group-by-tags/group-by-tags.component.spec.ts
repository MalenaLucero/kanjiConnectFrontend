import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupByTagsComponent } from './group-by-tags.component';

xdescribe('GroupByTagsComponent', () => {
  let component: GroupByTagsComponent;
  let fixture: ComponentFixture<GroupByTagsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupByTagsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupByTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
