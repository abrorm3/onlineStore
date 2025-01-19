import {CanActivateFn, Router, UrlTree} from '@angular/router';
import {AuthService} from './auth.service';
import {inject} from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router)
  if (authService.getToken()) {
    return true;
  } else {
    return router.parseUrl('/login')
  }
};
