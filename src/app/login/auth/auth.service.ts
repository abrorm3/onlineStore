import {Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {Product, TokenType} from '../../shared/types';
import {Router} from '@angular/router';
import {SharedService} from '../../shared/shared.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = 'http://rest-items.research.cloudonix.io';
  private tokenSubject = new BehaviorSubject<TokenType | null>(this.getToken());

  constructor(private http: HttpClient, private router: Router, private sharedService:SharedService) {
  }

  setToken(token: TokenType) {
    if (!token) return;
    localStorage.setItem('auth_token', token.toString());
    this.tokenSubject.next(token);
    this.sharedService.fetchProducts();
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
}
