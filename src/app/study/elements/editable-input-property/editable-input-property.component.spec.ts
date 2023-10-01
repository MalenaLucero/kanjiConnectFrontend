import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditableInputPropertyComponent } from './editable-input-property.component';

describe('EditableInputPropertyComponent', () => {
  let component: EditableInputPropertyComponent;
  let fixture: ComponentFixture<EditableInputPropertyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditableInputPropertyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditableInputPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
