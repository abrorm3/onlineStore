import { Component } from '@angular/core';
import {MatDialogActions, MatDialogClose, MatDialogContent} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-delete-dialog',
  imports: [
    MatDialogActions,
    MatButton,
    MatDialogClose,
    MatDialogContent
  ],
  templateUrl: './delete-dialog.component.html',
  styleUrl: './delete-dialog.component.css'
})
export class DeleteDialogComponent {

}
