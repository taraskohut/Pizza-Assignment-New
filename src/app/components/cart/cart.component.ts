import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AsyncPipe, CurrencyPipe, NgForOf, NgIf } from '@angular/common';

import { Observable } from 'rxjs';

import { CartService } from '../../../services/cart.service';
import { CartItem } from '../../../models/interfaces/CartItem';
import { MatCard } from '@angular/material/card';
import { MatButton, MatFabButton, MatMiniFabButton } from '@angular/material/button';

@Component({
  selector: 'app-cart',
  standalone: true,
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  imports: [NgIf, CurrencyPipe, NgForOf, AsyncPipe, MatCard, MatFabButton, MatMiniFabButton, MatButton],
})
export class CartComponent {
  private router = inject(Router);
  private cartService = inject(CartService);
  public cartItems$: Observable<CartItem[]> = this.cartService.cartItems$;
  public totals$: Observable<{ subtotal: number; tax: number; total: number }>;

  constructor() {
    this.totals$ = this.cartService.getCartTotals();
  }

  public toConfirmationPage(): void {
    this.router.navigate(['/order-confirmation']);
  }
}
