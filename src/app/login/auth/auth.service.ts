import {Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {Product, tokenType} from '../../shared/types';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = 'http://rest-items.research.cloudonix.io';

  constructor(private http: HttpClient) {
  }

  setToken(token: tokenType) {
    if (!token) return;
    localStorage.setItem('auth_token', token.toString());
    this.fetchProducts();
  }

  getToken(): tokenType {
    return localStorage.getItem('auth_token');
  }

  logout(): void {
    localStorage.removeItem('auth_token');
  }

  fetchProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.url}/items`);
  }
  updateItem(item: Product){
    const updateUrl = `${this.url}/items/${item.id}`;
    return this.http.patch<Product[]>(updateUrl, {
      name: item.name,
      description: item.description,
      cost: item.cost,
      profile: item.profile
    });
  }
}
