import {Component, effect, inject, OnInit, signal} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {TokenType} from '../shared/types';
import {AuthService} from '../login/auth/auth.service';

@Component({
  selector: 'app-header',
  imports: [
    MatButton
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  authKey = signal<TokenType>(null)
  authService = inject(AuthService)

  ngOnInit() {
    this.authService.tokenChanges().subscribe(((token) => {
      this.authKey.set(token)
    }));
  }

  logout() {
    this.authService.logout();
  }
}
