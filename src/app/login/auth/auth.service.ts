import {Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {Product, TokenType} from '../../shared/types';
import {Router} from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = 'http://rest-items.research.cloudonix.io';
  private tokenSubject = new BehaviorSubject<TokenType | null>(this.getToken());

  constructor(private http: HttpClient, private router: Router) {
  }

  setToken(token: TokenType) {
    if (!token) return;
    localStorage.setItem('auth_token', token.toString());
    this.tokenSubject.next(token);
    this.fetchProducts();
  }

  getToken(): TokenType {
    return localStorage.getItem('auth_token');
  }
  tokenChanges(): Observable<TokenType | null> {
    return this.tokenSubject.asObservable();
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    this.tokenSubject.next(null);
    this.router.navigate(['login']);
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

  deleteItem(element: Product) {
    return this.http.delete(`${this.url}/items/${element.id}`)
  }
}
