import {effect, Injectable, signal} from '@angular/core';
import {Product} from './types';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  // private url = environment.apiUrl;
  private url = 'http://rest-items.research.cloudonix.io';

  isLoading = signal<boolean>(false);

  constructor(private http: HttpClient) {
  }

  addItem(item: Partial<Product>): Observable<Product> {
    return this.http.post<Product>(`${this.url}/items`, item);
  }

  fetchProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.url}/items`);
  }

  updateItem(item: Product) {
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
