import {Component, signal, effect, model} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';

import {AuthService} from '../login/auth/auth.service';
import {Product, Profile} from '../shared/types';
import {MatCheckbox} from '@angular/material/checkbox';
import {ProfileEditorComponent} from './profile-editor/profile-editor.component';
import {MatDialog} from '@angular/material/dialog';
import {DeleteDialogComponent} from './delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-product-list',
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    ProfileEditorComponent
  ],
  templateUrl: './product-list.component.html',
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
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
  tempEdit: Partial<Product> = {};


  constructor(private authService: AuthService, private dialog: MatDialog) {
    this.authService.fetchProducts().subscribe((data: Product[]) => {
      this.productList.set(data)

    })
  }

  startEditing(element: Product) {
    this.editingId.set(element.id);
    this.tempEdit = {...element};
  }

  saveEdit(element: Product) {
    Object.assign(element, this.tempEdit);
    this.editingId.set(null);
    this.tempEdit = {};

    this.authService.updateItem(element).subscribe({
      next: (updatedProduct) => {
        console.log('Product updated successfully:', updatedProduct);
      },
      error: (err) => {
        console.error('Error updating product:', err);
      },
    });
    this.editingId.set(null);
  }

  onInputChange(event: Event, key: keyof Product) {
    const target = event.target as HTMLInputElement | HTMLTextAreaElement;
    const value = target.value;

    if (key === 'cost') {
      this.tempEdit[key] = parseFloat(value) as any;
    } else {
      this.tempEdit[key] = value as any;
    }
  }

  cancelEdit() {
    this.tempEdit = {};
    this.editingId.set(null);
  }

  openDeleteDialog(element: Product) {
    const dialogRef = this.dialog.open(DeleteDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteItem(element);
      }
    });
  }

  deleteItem(element: Product) {
    this.authService.deleteItem(element).subscribe({
      next: () => {
        console.log('Product deleted successfully:', element);
        this.productList.set(
          this.productList().filter((p) => p.id !== element.id)
        )
      },
      error: (err) => {
        console.error('Error deleting product:', err);
      },
    });
  }

  onProfileChange($event: Profile) {
    this.tempEdit.profile = $event;
  }
}
