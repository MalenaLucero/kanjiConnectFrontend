import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserKanjiCardReadonlyComponent } from './user-kanji-card-readonly.component';

xdescribe('UserKanjiCardReadonlyComponent', () => {
  let component: UserKanjiCardReadonlyComponent;
  let fixture: ComponentFixture<UserKanjiCardReadonlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserKanjiCardReadonlyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserKanjiCardReadonlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
