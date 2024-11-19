import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';

import { map, Observable } from 'rxjs';

import { PizzaService } from '../../../services/pizza.service';
import { CartService } from '../../../services/cart.service';
import { Pizza } from '../../../models/interfaces/Pizza';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardImage, MatCardModule } from '@angular/material/card';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { MatButton, MatFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-pizza-selection',
  standalone: true,
  templateUrl: './pizza-selection.component.html',
  styleUrls: ['./pizza-selection.component.scss'],
  imports: [AsyncPipe, NgForOf, NgIf, MatCard, MatGridList, MatGridTile, MatCardHeader, MatCardContent, MatCardImage, MatCardActions, MatCardModule, MatButton, MatIcon, MatFabButton],
})
export class PizzaSelectionComponent {
  private pizzaService = inject(PizzaService);
  private cartService = inject(CartService);
  private router = inject(Router);
  public filteredPizzas$: Observable<Pizza[]>;
  public cartItems$ = this.cartService.cartItems$;

  constructor() {
    this.filteredPizzas$ = this.pizzaService.getFilteredPizzas();
  }

  public addToCart(pizza: Pizza): void {
    this.cartService.addPizzaToCart(pizza);
  }

  public removeFromCart(pizza: Pizza): void {
    this.cartService.removePizzaFromCart(pizza);
  }

  public getPizzaQuantity(pizza: Pizza): Observable<number> {
    return this.cartItems$.pipe(
      map(
        (items) =>
          items.find((item) => item.pizza.id === pizza.id)?.quantity || 0,
      ),
    );
  }

  public confirmSelection(): void {
    this.router.navigate(['/cart']);
  }

  public trackById(index: number, pizza: Pizza): number {
    return pizza.id;
  }
}
