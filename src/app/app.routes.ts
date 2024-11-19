import { Routes } from '@angular/router';

import { PizzeriaSelectionComponent } from './components/pizzeria-selection/pizzeria-selection.component';
import { PizzaSelectionComponent } from './components/pizza-selection/pizza-selection.component';
import { CartComponent } from './components/cart/cart.component';
import { OrderConfirmationComponent } from './components/order-confirmation/order-confirmation.component';

export const routes: Routes = [
  { path: '', redirectTo: 'pizzerias', pathMatch: 'full' },
  { path: 'pizzerias', component: PizzeriaSelectionComponent },
  { path: 'pizzas', component: PizzaSelectionComponent },
  { path: 'cart', component: CartComponent },
  { path: 'order-confirmation', component: OrderConfirmationComponent },
];
