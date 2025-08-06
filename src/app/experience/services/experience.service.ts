import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, map, finalize } from 'rxjs/operators';

import { 
  Experience, 
  ExperienceSearchParams, 
  ExperienceListResponse,
  ApiResponse 
} from '../models/experience.interface';

// Configuration - Update with your actual backend URL
export const BASE_URL = 'http://your-remote-ip:your-port/api'; // Replace with your backend URL

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {
  private readonly apiUrl = `${BASE_URL}/experiences`;
  private loadingSubject = new BehaviorSubject<boolean>(false);
  
  // Public loading state observable
  public loading$ = this.loadingSubject.asObservable();

  constructor(private http: HttpClient) {}

  /**
   * Get all experiences with optional search parameters
   */
  getExperiences(params?: ExperienceSearchParams): Observable<ExperienceListResponse> {
    this.setLoading(true);
    
    let httpParams = new HttpParams();
    
    if (params) {
      Object.keys(params).forEach(key => {
        const value = (params as any)[key];
        if (value !== undefined && value !== null && value !== '') {
          httpParams = httpParams.set(key, value.toString());
        }
      });
    }

    return this.http.get<any>(this.apiUrl, { params: httpParams })
      .pipe(
        map(response => {
          // Handle different response formats from your backend
          if (response.data) {
            return response.data;
          }
          // If direct array response
          if (Array.isArray(response)) {
            return {
              experiences: response,
              total: response.length,
              page: 1,
              totalPages: 1
            };
          }
          return response;
        }),
        catchError(this.handleError),
        finalize(() => this.setLoading(false))
      );
  }

  /**
   * Get a single experience by ID
   */
  getExperienceById(id: string): Observable<Experience> {
    this.setLoading(true);
    
    return this.http.get<any>(`${this.apiUrl}/${id}`)
      .pipe(
        map(response => response.data || response),
        catchError(this.handleError),
        finalize(() => this.setLoading(false))
      );
  }

  /**
   * Create a new experience
   */
  createExperience(experience: Omit<Experience, 'id' | 'createdAt' | 'updatedAt'>): Observable<Experience> {
    this.setLoading(true);
    
    return this.http.post<any>(this.apiUrl, experience)
      .pipe(
        map(response => response.data || response),
        catchError(this.handleError),
        finalize(() => this.setLoading(false))
      );
  }

  /**
   * Update an existing experience
   */
  updateExperience(id: string, experience: Partial<Experience>): Observable<Experience> {
    this.setLoading(true);
    
    return this.http.put<any>(`${this.apiUrl}/${id}`, experience)
      .pipe(
        map(response => response.data || response),
        catchError(this.handleError),
        finalize(() => this.setLoading(false))
      );
  }

  /**
   * Delete an experience
   */
  deleteExperience(id: string): Observable<void> {
    this.setLoading(true);
    
    return this.http.delete<any>(`${this.apiUrl}/${id}`)
      .pipe(
        map(() => void 0),
        catchError(this.handleError),
        finalize(() => this.setLoading(false))
      );
  }

  /**
   * Get popular experiences
   */
  getPopularExperiences(): Observable<Experience[]> {
    this.setLoading(true);
    
    return this.http.get<any>(`${this.apiUrl}/popular`)
      .pipe(
        map(response => response.data || response),
        catchError(this.handleError),
        finalize(() => this.setLoading(false))
      );
  }

  /**
   * Get low stock experiences
   */
  getLowStockExperiences(): Observable<Experience[]> {
    this.setLoading(true);
    
    return this.http.get<any>(`${this.apiUrl}/low-stock`)
      .pipe(
        map(response => response.data || response),
        catchError(this.handleError),
        finalize(() => this.setLoading(false))
      );
  }

  /**
   * Get experience statistics
   */
  getExperienceStats(): Observable<any> {
    this.setLoading(true);
    
    return this.http.get<any>(`${this.apiUrl}/stats`)
      .pipe(
        map(response => response.data || response),
        catchError(this.handleError),
        finalize(() => this.setLoading(false))
      );
  }

  /**
   * Set loading state
   */
  private setLoading(loading: boolean): void {
    this.loadingSubject.next(loading);
  }

  /**
   * Handle HTTP errors
   */
  private handleError = (error: HttpErrorResponse): Observable<never> => {
    let errorMessage = 'An unknown error occurred';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = error.error?.message || `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    
    console.error('ExperienceService Error:', errorMessage);
    return throwError(() => new Error(errorMessage));
  };
}