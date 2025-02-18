import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';

import { Pizzeria } from '../models/interfaces/Pizzeria';

@Injectable({ providedIn: 'root' })
export class PizzeriaService {
  private readonly pizzeriasSubject = new BehaviorSubject<Pizzeria[]>([]);
  private readonly selectedPizzeriaSubject =
    new BehaviorSubject<Pizzeria | null>(null);
  private readonly API_URL = 'http://localhost:3000/pizzerias';
  public readonly selectedPizzeria$ =
    this.selectedPizzeriaSubject.asObservable();
  public readonly pizzerias$ = this.pizzeriasSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadPizzerias();
  }

  private loadPizzerias(): void {
    this.http
      .get<Pizzeria[]>(this.API_URL)
      .pipe(
        retry(3),
        map((pizzerias) => pizzerias || []),
        catchError((error) => {
          console.error('Failed to load pizzerias', error);
          return throwError(() => new Error('Error loading pizzerias'));
        }),
      )
      .subscribe({
        next: (pizzerias) => this.pizzeriasSubject.next(pizzerias),
        error: () => this.pizzeriasSubject.next([]),
      });
  }

  public setSelectedPizzeria(pizzeria: Pizzeria): void {
    this.selectedPizzeriaSubject.next(pizzeria);
  }

  public saveSelectedPizzeriaToLocalStorage(pizzeria: Pizzeria): void {
    localStorage.setItem('selectedPizzeria', JSON.stringify(pizzeria));
  }

  public getSelectedPizzeriaFromLocalStorage(): Pizzeria | null {
    const stored = localStorage.getItem('selectedPizzeria');
    return stored ? JSON.parse(stored) : null;
  }
}
