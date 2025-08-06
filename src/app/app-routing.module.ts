import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'flights',
    loadChildren: () => import('./flights/flights.module').then(m => m.FlightsModule)
  },
  {
    path: 'hotels',
    loadChildren: () => import('./hotels/hotels.module').then(m => m.HotelsModule)
  },
  {
    path: 'visa',
    loadChildren: () => import('./visa/visa.module').then(m => m.VisaModule)
  },
  {
    path: 'experiences',
    loadChildren: () => import('./experience/experience.module').then(m => m.ExperienceModule)
  },
  {
    path: 'erp',
    loadChildren: () => import('./erp/erp.module').then(m => m.ERPModule)
  },
  {
    path: '**',
    redirectTo: '/dashboard'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }