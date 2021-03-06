import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';

import { ReviewComponent } from './pages/review/review.component';
import { UploadExpressionComponent } from './pages/upload-expression/upload-expression.component';
import { CardFilterComponent } from './components/card-filter/card-filter.component';
import { SharedModule } from '../shared/shared.module';
import { DifficultyButtonsComponent } from './components/difficulty-buttons/difficulty-buttons.component';
import { ExpressionFormComponent } from './components/expression-form/expression-form.component';
import { ReviewCardPopupComponent } from './components/review-card-popup/review-card-popup.component';
import { ReviewCounterComponent } from './components/review-counter/review-counter.component';
import { ReviewCardComponent } from './components/review-card/review-card.component';
import { DifficultyPipe } from './pipes/difficulty.pipe';
import { ExpressionCastPipe } from './pipes/expression-cast.pipe';
import { UserKanjiCastPipe } from './pipes/user-kanji-cast.pipe';
import { ManageUserKanjiComponent } from './pages/manage-user-kanji/manage-user-kanji.component';
import { UserKanjiCardComponent } from './components/user-kanji-card/user-kanji-card.component';
import { ExpressionPopupComponent } from './components/expression-popup/expression-popup.component';
import { UploadLessonComponent } from './pages/upload-lesson/upload-lesson.component';
import { UploadTagComponent } from './pages/upload-tag/upload-tag.component';
import { ManageExpressionsComponent } from './pages/manage-expressions/manage-expressions.component';
import { ManageComponent } from './pages/manage/manage.component';
import { ManageLessonsComponent } from './pages/manage-lessons/manage-lessons.component';
import { ManageTagsComponent } from './pages/manage-tags/manage-tags.component';
import { UploadComponent } from './pages/upload/upload.component';
import { ExpressionCardComponent } from './components/expression-card/expression-card.component';

const routes: Routes = [
  {
    path: 'study',
    children: [
      {
        path: 'review',
        component: ReviewComponent
      }, {
        path: 'upload',
        component: UploadComponent,
        children: [
          {
            path: 'expression',
            component: UploadExpressionComponent
          }, {
            path: 'lesson',
            component: UploadLessonComponent
          }, {
            path: 'tag',
            component: UploadTagComponent
          }
        ]
      }, {
        path: 'manage',
        component: ManageComponent,
        children: [
          {
            path: 'expressions',
            component: ManageExpressionsComponent
          }, {
            path: 'user-kanji',
            component: ManageUserKanjiComponent
          }, {
            path: 'lessons',
            component: ManageLessonsComponent
          }, {
            path: 'tags',
            component: ManageTagsComponent
          }
        ]
      }
    ]
  }, {
    path: '',
    redirectTo: '/study/review',
    pathMatch: 'full'
  },
]

@NgModule({
  declarations: [
    CardFilterComponent,
    DifficultyButtonsComponent,
    ExpressionFormComponent,
    ReviewCardPopupComponent,
    ReviewCounterComponent,
    ReviewCardComponent,
    DifficultyPipe,
    ExpressionCastPipe,
    UserKanjiCastPipe,
    ReviewComponent,
    UploadExpressionComponent,
    ManageUserKanjiComponent,
    UserKanjiCardComponent,
    ExpressionPopupComponent,
    UploadLessonComponent,
    UploadTagComponent,
    ManageExpressionsComponent,
    ManageComponent,
    ManageLessonsComponent,
    ManageTagsComponent,
    UploadComponent,
    ExpressionCardComponent,
  ],
  imports: [
    CommonModule,
    MatExpansionModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    SharedModule,
    MatInputModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    CardFilterComponent,
    DifficultyButtonsComponent,
  ]
})
export class StudyModule { }
