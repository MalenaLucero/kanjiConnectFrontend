import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteConfirmComponent } from './delete-confirm.component';

xdescribe('DeleteConfirmComponent', () => {
  let component: DeleteConfirmComponent;
  let fixture: ComponentFixture<DeleteConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteConfirmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
