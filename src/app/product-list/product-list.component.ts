import { Component, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';

import { AuthService } from '../login/auth/auth.service';
import { Product } from '../shared/types';
@Component({
  selector: 'app-product-list',
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './product-list.component.html',
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
    ])
  ],
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  productList = signal<Product[]>([]);
  columnsToDisplay = ['id', 'sku', 'name', 'cost'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement = signal<Product | null>(null);
  editingId = signal<number | null>(null);

  constructor(private authService: AuthService) {
    effect(() => {
      console.log(this.expandedElement())
    });
    this.authService.fetchProducts().subscribe((data: Product[]) => {
      console.log(data)
      this.productList.set(data)

    })
  }

  startEditing(element: Product) {
    this.editingId.set(element.id);
  }

// Optionally, handle saving or cancelling:
  saveEdit(element: Product) {
    // TODO: call a service to PATCH or otherwise update the product
    console.log('Saving changes for', element);

    // Once saved, exit edit mode
    this.editingId.set(null);
  }

  cancelEdit() {
    this.editingId.set(null);
  }
}
