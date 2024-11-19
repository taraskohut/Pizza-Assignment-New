import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { PizzeriaService } from '../../../services/pizzeria.service';
import { Pizzeria } from '../../../models/interfaces/Pizzeria';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { MatCard } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-pizzeria-selection',
  standalone: true,
  imports: [AsyncPipe, NgIf, MatCard, FormsModule, ReactiveFormsModule, MatFabButton, MatIcon],
  templateUrl: './pizzeria-selection.component.html',
  styleUrls: ['./pizzeria-selection.component.scss'],
})
export class PizzeriaSelectionComponent implements OnInit {
  private pizzeriaService = inject(PizzeriaService);
  private router = inject(Router);
  public pizzerias$: Observable<Pizzeria[]> | undefined;
  public selectedPizzeria$: Observable<Pizzeria | null> | undefined;

  ngOnInit(): void {
    this.pizzerias$ = this.pizzeriaService.pizzerias$;
    this.selectedPizzeria$ = this.pizzeriaService.selectedPizzeria$;
    const storedPizzeria =
      this.pizzeriaService.getSelectedPizzeriaFromLocalStorage();
    if (storedPizzeria) {
      this.pizzeriaService.setSelectedPizzeria(storedPizzeria);
    }
  }

  public onSelectPizzeria(pizzeria: Pizzeria): void {
    this.pizzeriaService.setSelectedPizzeria(pizzeria);
    this.pizzeriaService.saveSelectedPizzeriaToLocalStorage(pizzeria);
  }

  public goToPizzaSelection(): void {
    this.router.navigate(['/pizzas']);
  }

  public trackById(index: number, pizzeria: Pizzeria): number {
    console.log(pizzeria.id)
    return pizzeria.id;
  }
}
