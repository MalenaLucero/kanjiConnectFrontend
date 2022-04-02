import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserKanjiComponent } from './user-kanji.component';

describe('UserKanjiComponent', () => {
  let component: UserKanjiComponent;
  let fixture: ComponentFixture<UserKanjiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserKanjiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserKanjiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
