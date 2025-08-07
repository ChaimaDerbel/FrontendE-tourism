import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppsLayoutComponent } from './components/apps-layout/apps-layout.component';

const routes: Routes = [
  {
    path: '',
    component: AppsLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'searching',
        pathMatch: 'full'
      },
      {
        path: 'searching',
        loadChildren: () => import('./searching/searching.module').then(m => m.SearchingModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppsRoutingModule { }