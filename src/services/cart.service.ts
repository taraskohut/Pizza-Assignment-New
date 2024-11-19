import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';

import { CartItem } from '../models/interfaces/CartItem';
import { Pizza } from '../models/interfaces/Pizza';
import { CartTotal } from '../models/interfaces/CartTotal';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly cartItemsSubject = new BehaviorSubject<CartItem[]>(
    this.loadCartFromLocalStorage(),
  );
  private readonly cartTotalsSubject = new BehaviorSubject<CartTotal>({
    subtotal: 0,
    tax: 0,
    total: 0,
  });
  private usTaxRate: number = 0;
  public readonly cartTotals$ = this.cartTotalsSubject.asObservable();
  public readonly cartItems$ = this.cartItemsSubject.asObservable();

  constructor(private http: HttpClient) {
    this.calculateTotals();
    this.fetchUsTaxRate();
  }

  private fetchUsTaxRate(): void {
    this.http
      .get<{ us_tax_rate: number }>('http://localhost:3000/settings')
      .pipe(
        tap((settings) => {
          this.usTaxRate = settings.us_tax_rate;
          this.calculateTotals();
        }),
      )
      .subscribe({
        error: (error) => console.error('Failed to load tax rate', error),
      });
  }

  public addPizzaToCart(pizza: Pizza): void {
    const updatedCart = [...this.cartItemsSubject.getValue()];
    const existingItem = updatedCart.find((item) => item.pizza.id === pizza.id);

    if (existingItem) {
      existingItem.quantity++;
    } else {
      updatedCart.push({ pizza, quantity: 1 });
    }

    this.updateCart(updatedCart);
  }

  public removePizzaFromCart(pizza: Pizza): void {
    const updatedCart = [...this.cartItemsSubject.getValue()];
    const existingItemIndex = updatedCart.findIndex(
      (item) => item.pizza.id === pizza.id,
    );

    if (existingItemIndex > -1) {
      const existingItem = updatedCart[existingItemIndex];
      if (existingItem.quantity > 1) {
        existingItem.quantity--;
      } else {
        updatedCart.splice(existingItemIndex, 1);
      }
    }

    this.updateCart(updatedCart);
  }

  public getCartTotals(): Observable<CartTotal> {
    return this.cartTotals$;
  }

  private updateCart(cartItems: CartItem[]): void {
    this.cartItemsSubject.next(cartItems);
    this.saveCartToLocalStorage(cartItems);
    this.calculateTotals();
  }

  private calculateTotals(): void {
    const cartItems = this.cartItemsSubject.getValue();

    const subtotal = cartItems.reduce(
      (sum, item) => sum + item.pizza.price * item.quantity,
      0,
    );

    const tax = cartItems.reduce((sum, item) => {
      return item.pizza.is_taxed
        ? sum + (item.pizza.price * item.quantity * this.usTaxRate) / 100
        : sum;
    }, 0);

    const total = subtotal + tax;

    this.cartTotalsSubject.next({ subtotal, tax, total });
  }

  private loadCartFromLocalStorage(): CartItem[] {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  }

  private saveCartToLocalStorage(cartItems: CartItem[]): void {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }
}
