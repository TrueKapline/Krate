import { AuthService } from '../auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  canActivate() {
    return this.auth.whoAmI().pipe(
      map(user => {
        if (!user || user.role !== 'admin') {
          return this.router.createUrlTree(['/']);
        }
        return true;
      })
    );
  }
}
