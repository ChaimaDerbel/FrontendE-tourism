import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Router, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs';
import { map, shareReplay, filter } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  private pageTitles: { [key: string]: string } = {
    '/dashboard': 'Dashboard',
    '/flights': 'Flight Management',
    '/hotels': 'Hotel Management',
    '/experiences': 'Experience Management',
    '/visa': 'Visa Services',
    '/erp': 'ERP System',
    '/settings': 'Settings',
    '/profile': 'User Profile'
  };

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Subscribe to route changes to update page title
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      // Update page title logic can be added here
    });
  }

  /**
   * Get current page title based on route
   */
  getPageTitle(): string {
    const currentRoute = this.router.url.split('?')[0]; // Remove query params
    
    // Check for exact matches first
    if (this.pageTitles[currentRoute]) {
      return this.pageTitles[currentRoute];
    }
    
    // Check for partial matches (for nested routes)
    for (const route in this.pageTitles) {
      if (currentRoute.startsWith(route) && route !== '/') {
        return this.pageTitles[route];
      }
    }
    
    return 'E-Tourism Platform';
  }

  /**
   * Handle user logout
   */
  logout(): void {
    // Implement logout logic here
    // For example: clear tokens, redirect to login
    localStorage.removeItem('authToken');
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}