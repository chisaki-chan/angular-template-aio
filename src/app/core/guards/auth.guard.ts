import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { environment } from 'src/environments/environment';
import { PersistenceStorage } from 'src/app/utils/persistence-storage';

@Injectable({ providedIn: 'root' })
export class AuthGuard {
  currentUserLogin: any;

  constructor(private router: Router) {}

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const token = PersistenceStorage.token.get();
    const response = await fetch(`${environment.apiUrl}/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
      return false;
    }
    const storedData = PersistenceStorage.user.get();

    if (!storedData) {
      PersistenceStorage.user.remove();
      PersistenceStorage.token.remove();

      this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
      return false;
    }

    if (storedData) {
      PersistenceStorage.user.set(storedData);
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
