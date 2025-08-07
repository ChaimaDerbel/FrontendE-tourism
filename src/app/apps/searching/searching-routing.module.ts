import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchingLayoutComponent } from './components/searching-layout/searching-layout.component';

const routes: Routes = [
  {
    path: '',
    component: SearchingLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'experiences',
        pathMatch: 'full'
      },
      {
        path: 'experiences',
        loadChildren: () => import('./experiences/experiences.module').then(m => m.ExperiencesModule)
      },
      {
        path: 'packages',
        loadChildren: () => import('./packages/packages.module').then(m => m.PackagesModule)
      },
      {
        path: 'tours',
        loadChildren: () => import('./tours/tours.module').then(m => m.ToursModule)
      },
      {
        path: 'hotels',
        loadChildren: () => import('./hotels/hotels.module').then(m => m.HotelsModule)
      },
      {
        path: 'flights',
        loadChildren: () => import('./flights/flights.module').then(m => m.FlightsModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchingRoutingModule { }