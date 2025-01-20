import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent,
  MatDialogRef, MatDialogTitle,
} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { Product } from '../../shared/types';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-insert-item-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSelectModule,
    MatOptionModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
  ],
  templateUrl: './insert-item-dialog.component.html',
  styleUrls: ['./insert-item-dialog.component.css'],
})
export class InsertItemDialogComponent {
  item: Partial<Product> = {
    name: '',
    sku: '',
    description: '',
    cost: 0,
    profile: {
      type: 'furniture',
      available: false,
      backlog: 0,
    },
  };
  typeOptions = ['furniture', 'equipment', 'stationary', 'part'];

  constructor(
    private dialogRef: MatDialogRef<InsertItemDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  save(): void {
    this.dialogRef.close(this.item);
  }

  get profile() {
    if (!this.item.profile) {
      this.item.profile = {
        type: 'furniture',
        available: false,
        backlog: 0,
      };
    }
    return this.item.profile;
  }
}
