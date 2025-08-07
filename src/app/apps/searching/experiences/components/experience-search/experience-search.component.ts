import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';

import { ExperienceService } from '../../services/experience.service';
import { 
  Experience, 
  ExperienceCategory, 
  DifficultyLevel,
  ExperienceSearchParams 
} from '../../models/experience.interface';

@Component({
  selector: 'app-experience-search',
  templateUrl: './experience-search.component.html',
  styleUrls: ['./experience-search.component.scss']
})
export class ExperienceSearchComponent implements OnInit, OnDestroy {
  searchForm: FormGroup;
  experiences: Experience[] = [];
  totalExperiences = 0;
  isSearching = false;
  
  categories = Object.values(ExperienceCategory);
  difficulties = Object.values(DifficultyLevel);
  
  // Price range
  minPrice = 0;
  maxPrice = 1000;
  
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private experienceService: ExperienceService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.searchForm = this.createSearchForm();
  }

  ngOnInit(): void {
    this.setupSearchFormSubscription();
    this.loadInitialExperiences();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Create reactive search form
   */
  private createSearchForm(): FormGroup {
    return this.fb.group({
      search: [''],
      location: [''],
      category: [''],
      difficulty: [''],
      minPrice: [this.minPrice],
      maxPrice: [this.maxPrice],
      availability: ['']
    });
  }

  /**
   * Setup search form subscription with debouncing
   */
  private setupSearchFormSubscription(): void {
    this.searchForm.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.searchExperiences();
      });
  }

  /**
   * Load initial experiences
   */
  private loadInitialExperiences(): void {
    this.searchExperiences();
  }

  /**
   * Search experiences with current form values
   */
  searchExperiences(): void {
    this.isSearching = true;
    
    const searchParams: ExperienceSearchParams = {
      ...this.searchForm.value,
      limit: 20
    };

    // Remove empty values
    Object.keys(searchParams).forEach(key => {
      const value = (searchParams as any)[key];
      if (value === '' || value === null || value === undefined) {
        delete (searchParams as any)[key];
      }
    });

    this.experienceService.getExperiences(searchParams)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.experiences = response.experiences;
          this.totalExperiences = response.total;
          this.isSearching = false;
        },
        error: (error) => {
          this.showError('Failed to search experiences. Please try again.');
          console.error('Error searching experiences:', error);
          this.isSearching = false;
        }
      });
  }

  /**
   * Clear all search filters
   */
  clearFilters(): void {
    this.searchForm.reset({
      search: '',
      location: '',
      category: '',
      difficulty: '',
      minPrice: this.minPrice,
      maxPrice: this.maxPrice,
      availability: ''
    });
  }

  /**
   * Navigate to experience detail
   */
  viewExperience(experienceId: string): void {
    this.router.navigate(['/apps/searching/experiences', experienceId]);
  }

  /**
   * Navigate to create new experience
   */
  createExperience(): void {
    this.router.navigate(['/apps/searching/experiences/new']);
  }

  /**
   * Format price with currency
   */
  formatPrice(price: number, currency: string): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency || 'USD'
    }).format(price);
  }

  /**
   * Get star rating array for display
   */
  getStarRating(rating: number): boolean[] {
    return Array(5).fill(false).map((_, i) => i < Math.floor(rating));
  }

  /**
   * Format duration display
   */
  formatDuration(hours: number): string {
    if (hours < 1) {
      return `${hours * 60} min`;
    } else if (hours === 1) {
      return '1 hour';
    } else if (hours < 24) {
      return `${hours} hours`;
    } else {
      const days = Math.floor(hours / 24);
      return `${days} day${days > 1 ? 's' : ''}`;
    }
  }

  /**
   * Show error message
   */
  private showError(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      panelClass: ['error-snackbar']
    });
  }
}