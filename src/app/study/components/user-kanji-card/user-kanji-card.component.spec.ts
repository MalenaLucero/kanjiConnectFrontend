import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserKanjiCardComponent } from './user-kanji-card.component';

describe('UserKanjiCardComponent', () => {
  let component: UserKanjiCardComponent;
  let fixture: ComponentFixture<UserKanjiCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserKanjiCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserKanjiCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
