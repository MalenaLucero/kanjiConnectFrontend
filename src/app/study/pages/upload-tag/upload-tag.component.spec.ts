import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadTagComponent } from './upload-tag.component';

describe('UploadTagComponent', () => {
  let component: UploadTagComponent;
  let fixture: ComponentFixture<UploadTagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadTagComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
