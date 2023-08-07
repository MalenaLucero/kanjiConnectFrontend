import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserKanjiCardEditableComponent } from './user-kanji-card-editable.component';

xdescribe('UserKanjiCardEditableComponent', () => {
  let component: UserKanjiCardEditableComponent;
  let fixture: ComponentFixture<UserKanjiCardEditableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserKanjiCardEditableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserKanjiCardEditableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
