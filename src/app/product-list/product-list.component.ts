import {Component, signal} from '@angular/core';
import {AuthService} from '../login/auth/auth.service';
import {Product} from '../shared/types';
import {
  MatCard,
  MatCardActions,
  MatCardAvatar,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle
} from '@angular/material/card';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-product-list',
  imports: [
    MatCardContent,
    MatCardTitle,
    MatCardSubtitle,
    MatCardActions,
    MatCardHeader,
    MatCard
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  productList = signal<Product[]>([]);

  constructor(private authService: AuthService) {
    this.authService.fetchProducts().subscribe((data: Product[]) => {
      this.productList.set(data)
    })
  }
}
