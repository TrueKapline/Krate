import { Injectable, Signal, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environment/environment';
import { catchError, of, tap, throwError } from 'rxjs';
import { AuthDTO } from './types/auth-dto.interface';
import { WhoAmIDTO } from './types/whoami-dto.interface';
import { ProfileDTO } from './types/profile-dto.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly backend = environment.apiUrl;

  private _role = signal<string | null>(null);
  public role: Signal<string | null> = this._role.asReadonly();

  private _userEmail = signal<string | null>(null);
  public userEmail: Signal<string | null> = this._userEmail.asReadonly();

  constructor(private http: HttpClient) { }

  clearSession() {
    this._role.set(null);
    sessionStorage.removeItem('role');
  }

  get token(): string | null {
    return localStorage.getItem('token');
  }

  register(email: string, password: string, username: string) {
    const role = 'user';
    return this.http
      .post<AuthDTO>(`${this.backend}/register`,
        { email, password, username, role }
      ).pipe(
        catchError((err: HttpErrorResponse) => {
          if (err.status === 400) {
            return throwError(() => err.error.message);
          }
          return throwError(() => 'Ошибка регистрации');
        })
    );
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthDTO>(`${this.backend}/login`,
        { email, password }
      ).pipe(
        catchError((err: HttpErrorResponse) => {
          if (err.status === 400) {
            return throwError(() => err.error.message);
          }
          return throwError(() => 'Ошибка входа');
        })
    );
  }

  whoAmI() {
    const token = this.token;
    if (!token) {
      return of(null);
    }
    return this.http
      .get<WhoAmIDTO>(`${this.backend}/whoAmI`, {
        headers: { Authorization: token }
      }).pipe(
        tap((user) => {
          this._role.set(user.role);
          this._userEmail.set(user.email);
          sessionStorage.setItem('role', user.role)
        }),
        catchError(() => of(null))
      );
  }

  profile() {
    const token = this.token;
    if (!token) {
      return throwError(() => new Error('Нет токена'));
    }
    return this.http
      .get<ProfileDTO>(`${this.backend}/profile`, {
        headers: { 'Authorization': token }
      }).pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(() => err.error.message);
        })
      )
  }
}
