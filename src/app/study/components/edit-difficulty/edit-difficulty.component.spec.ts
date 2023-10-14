import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDifficultyComponent } from './edit-difficulty.component';

describe('EditDifficultyComponent', () => {
  let component: EditDifficultyComponent;
  let fixture: ComponentFixture<EditDifficultyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDifficultyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditDifficultyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
