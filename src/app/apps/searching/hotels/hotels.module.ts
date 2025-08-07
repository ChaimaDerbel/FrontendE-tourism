import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('../experiences/experiences.module').then(m => m.ExperiencesModule)
      }
    ])
  ]
})
export class HotelsModule { }