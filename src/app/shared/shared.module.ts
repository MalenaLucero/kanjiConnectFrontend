import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

import { MainNavComponent } from './components/header/main-nav/main-nav.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { AuthNavComponent } from './components/header/auth-nav/auth-nav.component';
import { LoadingComponent } from './components/loading/loading.component';
import { LoginComponent } from './components/login/login.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { SourceSelectComponent } from './elements/selects/source-select/source-select.component';
import { DifficultySelectComponent } from './elements/selects/difficulty-select/difficulty-select.component';
import { JlptSelectComponent } from './elements/selects/jlpt-select/jlpt-select.component';
import { LessonsSelectComponent } from './elements/selects/lessons-select/lessons-select.component';
import { TagsSelectComponent } from './elements/selects/tags-select/tags-select.component';
import { TransitivitySelectComponent } from './elements/selects/transitivity-select/transitivity-select.component';
import { MainButtonComponent } from './elements/buttons/main-button/main-button.component';
import { FirstTitlecasePipe } from './pipes/first-titlecase.pipe';
import { IconButtonComponent } from './elements/buttons/icon-button/icon-button.component';
import { WarnButtonComponent } from './elements/buttons/warn-button/warn-button.component';
import { AccentButtonComponent } from './elements/buttons/accent-button/accent-button.component';
import { HomeComponent } from './pages/home/home.component';
import { TableComponent } from './components/table/table.component';
import { HeaderComponent } from './components/header/header.component';
import { ArrayToStringPipe } from './pipes/array-to-string.pipe';
import { DeleteConfirmComponent } from './components/delete-confirm/delete-confirm.component';
import { BoldWordInStringPipe } from './pipes/bold-word-in-string.pipe';
import { InfoNavComponent } from './components/header/info-nav/info-nav.component';
import { PageTitleComponent } from './components/header/page-title/page-title.component';


@NgModule({
  declarations: [
    MainNavComponent,
    FooterComponent,
    AuthNavComponent,
    LoadingComponent,
    LoginComponent,
    SpinnerComponent,
    SourceSelectComponent,
    DifficultySelectComponent,
    JlptSelectComponent,
    LessonsSelectComponent,
    TagsSelectComponent,
    TransitivitySelectComponent,
    MainButtonComponent,
    FirstTitlecasePipe,
    IconButtonComponent,
    WarnButtonComponent,
    AccentButtonComponent,
    HomeComponent,
    TableComponent,
    HeaderComponent,
    ArrayToStringPipe,
    DeleteConfirmComponent,
    BoldWordInStringPipe,
    InfoNavComponent,
    PageTitleComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatProgressSpinnerModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCheckboxModule,
    MatTableModule,
    MatPaginatorModule,
  ], exports: [
    FooterComponent,
    LoadingComponent,
    LoginComponent,
    SpinnerComponent,
    SourceSelectComponent,
    DifficultySelectComponent,
    JlptSelectComponent,
    LessonsSelectComponent,
    TagsSelectComponent,
    TransitivitySelectComponent,
    MainButtonComponent,
    FirstTitlecasePipe,
    TableComponent,
    HeaderComponent,
    ArrayToStringPipe,
    DeleteConfirmComponent,
    BoldWordInStringPipe,
  ]
})
export class SharedModule { }
