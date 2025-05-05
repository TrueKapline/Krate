import { AuthService } from '../auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GuestGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  canActivate() {
    return this.auth.whoAmI().pipe(
      map(isAuth => {
        if (isAuth) {
          return this.router.createUrlTree(['/courses']);
        }
        return true;
      })
    );
  }
}
