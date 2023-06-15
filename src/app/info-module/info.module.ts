import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './pages/about/about.component';
import { ChangelogComponent } from './pages/changelog/changelog.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'info',
    children: [
      {
        path: 'about',
        component: AboutComponent
      }, {
        path: 'changelog',
        component: ChangelogComponent,
      },
    ]
  }
]

@NgModule({
  declarations: [
    AboutComponent,
    ChangelogComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class InfoModule { }
