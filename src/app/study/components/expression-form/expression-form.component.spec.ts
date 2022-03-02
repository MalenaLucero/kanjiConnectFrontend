import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SpinnerService } from 'src/app/shared/components/spinner/spinner.service';
import { ExpressionsService } from '../../services/expressions.service';

import { ExpressionFormComponent } from './expression-form.component';

xdescribe('ExpressionFormComponent', () => {
  let component: ExpressionFormComponent;
  let fixture: ComponentFixture<ExpressionFormComponent>;

  @Component({ selector: 'app-lessons-select', template: `` })
  class LessonsSelectMockComponent {}

  @Component({ selector: 'app-source-select', template: `` })
  class SourceSelectMockComponent {
    @Input() lessonId: string = '';
  }

  @Component({ selector: 'app-tags-select', template: `` })
  class TagsSelectMockComponent {}

  @Component({ selector: 'app-jlpt-select', template: `` })
  class JlptSelectMockComponent {}

  @Component({ selector: 'app-transitivity-select', template: `` })
  class TransitivitySelectMockComponent {}

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        imports: [HttpClientTestingModule, MatDialogModule, MatIconModule, MatCardModule, ReactiveFormsModule],
        declarations: [ ExpressionFormComponent, SourceSelectMockComponent, LessonsSelectMockComponent,
          TagsSelectMockComponent, JlptSelectMockComponent, TransitivitySelectMockComponent ],
        providers: [
            FormBuilder,
            ExpressionsService,
            SpinnerService,
            MatSnackBar
        ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpressionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});