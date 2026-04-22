import { CanActivateFn, Router } from '@angular/router';
import { Auth } from './services/auth';
import { inject } from '@angular/core';

export const joueurGuard: CanActivateFn = (route, state) => {
  const authService = inject(Auth);
  const router = inject(Router);
  
  authService.loadToken();
  
  if (!authService.isloggedIn || authService.isTokenExpired()) {
    router.navigate(['/login']);
    return false;
  }
  return true;
};

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(Auth);
  const router = inject(Router);
  
  authService.loadToken();
  
  if (!authService.isloggedIn || authService.isTokenExpired()) {
    router.navigate(['/login']);
    return false;
  }
  if (!authService.isAdmin()) {
    router.navigate(['/app-forbidden']);
    return false;
  }
  return true;
};