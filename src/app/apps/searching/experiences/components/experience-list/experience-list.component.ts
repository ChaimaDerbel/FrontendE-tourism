import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Experience } from '../../models/experience.interface';

@Component({
  selector: 'app-experience-list',
  templateUrl: './experience-list.component.html',
  styleUrls: ['./experience-list.component.scss']
})
export class ExperienceListComponent {
  @Input() experiences: Experience[] = [];
  @Input() loading = false;
  @Output() experienceSelected = new EventEmitter<string>();

  /**
   * Handle experience selection
   */
  onExperienceClick(experienceId: string): void {
    this.experienceSelected.emit(experienceId);
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
}