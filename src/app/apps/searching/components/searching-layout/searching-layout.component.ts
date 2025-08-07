import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay, filter } from 'rxjs/operators';

@Component({
  selector: 'app-searching-layout',
  templateUrl: './searching-layout.component.html',
  styleUrls: ['./searching-layout.component.scss']
})
export class SearchingLayoutComponent implements OnInit {
  
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  currentRoute = '';

  searchCategories = [
    { 
      name: 'Experiences', 
      route: 'experiences', 
      icon: 'explore',
      description: 'Discover unique local experiences'
    },
    { 
      name: 'Packages', 
      route: 'packages', 
      icon: 'card_travel',
      description: 'Complete travel packages'
    },
    { 
      name: 'Tours', 
      route: 'tours', 
      icon: 'tour',
      description: 'Guided tours and activities'
    },
    { 
      name: 'Hotels', 
      route: 'hotels', 
      icon: 'hotel',
      description: 'Accommodation options'
    },
    { 
      name: 'Flights', 
      route: 'flights', 
      icon: 'flight',
      description: 'Flight bookings'
    }
  ];

  constructor(
    private router: Router,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit(): void {
    // Track current route
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.currentRoute = event.url;
    });
  }

  /**
   * Navigate to specific search category
   */
  navigateTo(route: string): void {
    this.router.navigate(['/apps/searching', route]);
  }

  /**
   * Check if route is active
   */
  isRouteActive(route: string): boolean {
    return this.currentRoute.includes(route);
  }
}