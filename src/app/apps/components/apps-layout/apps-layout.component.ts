import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-apps-layout',
  templateUrl: './apps-layout.component.html',
  styleUrls: ['./apps-layout.component.scss']
})
export class AppsLayoutComponent implements OnInit {
  
  currentRoute = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Track current route for active tab highlighting
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.currentRoute = event.url;
    });
  }

  /**
   * Navigate to specific app section
   */
  navigateTo(route: string): void {
    this.router.navigate(['/apps', route]);
  }

  /**
   * Check if current route is active
   */
  isRouteActive(route: string): boolean {
    return this.currentRoute.includes(route);
  }
}