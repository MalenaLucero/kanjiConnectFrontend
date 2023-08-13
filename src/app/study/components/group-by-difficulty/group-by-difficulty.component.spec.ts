import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupByDifficultyComponent } from './group-by-difficulty.component';

describe('GroupByDifficultyComponent', () => {
  let component: GroupByDifficultyComponent;
  let fixture: ComponentFixture<GroupByDifficultyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupByDifficultyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupByDifficultyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
