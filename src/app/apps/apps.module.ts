import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Angular Material Modules
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';

// Apps Components
import { AppsLayoutComponent } from './components/apps-layout/apps-layout.component';

// Apps Routing
import { AppsRoutingModule } from './apps-routing.module';

@NgModule({
  declarations: [
    AppsLayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    AppsRoutingModule,
    // Angular Material
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    MatCardModule
  ]
})
export class AppsModule { }