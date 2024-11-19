import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { Pizza } from '../models/interfaces/Pizza';

@Injectable({ providedIn: 'root' })
export class PizzaService {
  private readonly API_URL = 'http://localhost:3000/pizzas';
  private selectedPizzeriaId: number | null = null;

  constructor(private http: HttpClient) {
    this.loadSelectedPizzeria();
  }

  public getFilteredPizzas(): Observable<Pizza[]> {
    if (this.selectedPizzeriaId === null) {
      return of([]);
    }
    return this.getPizzas().pipe(
      map((pizzas) =>
        pizzas.filter((pizza) =>
          pizza.available_in_pizzerias.includes(this.selectedPizzeriaId!),
        ),
      ),
    );
  }

  private getPizzas(): Observable<Pizza[]> {
    return this.http.get<Pizza[]>(this.API_URL).pipe(catchError(() => of([])));
  }
  private loadSelectedPizzeria(): void {
    const storedPizzeria = localStorage.getItem('selectedPizzeria');
    if (storedPizzeria) {
      const pizzeria = JSON.parse(storedPizzeria);
      this.selectedPizzeriaId = +pizzeria.id;
    }
  }
}
