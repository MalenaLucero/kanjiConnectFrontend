import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageUserKanjiComponent } from './manage-user-kanji.component';

xdescribe('UserKanjiComponent', () => {
  let component: ManageUserKanjiComponent;
  let fixture: ComponentFixture<ManageUserKanjiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageUserKanjiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageUserKanjiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
