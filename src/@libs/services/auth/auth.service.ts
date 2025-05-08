import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environment/environment';
import { catchError, map, of, throwError } from 'rxjs';
import { RegisterDTO } from './types/register-dto.interface';
import { WhoAmIDTO } from './types/whoami-dto.interface';
import { ProfileDTO } from './types/profile-dto.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly backend = environment.apiUrl;

  constructor(private http: HttpClient) { }

  get token(): string | null {
    return localStorage.getItem('token');
  }

  register(email: string, password: string, username: string) {
    const role = 'user';
    return this.http.post<RegisterDTO>(`${this.backend}/register`, { email, password, username, role }).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 400) {
          return throwError(() => err.error.message);
        }
        return throwError(() => 'Ошибка регистрации');
      })
    );
  }

  login(email: string, password: string) {
    return this.http.post<RegisterDTO>(`${this.backend}/login`, { email, password }).pipe(
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
      return of(false);
    }
    return this.http.get<WhoAmIDTO>(`${this.backend}/whoAmI`, { headers: { 'Authorization': token } }).pipe(
        map(() => true),
        catchError(() => of(false))
      );
  }

  profile() {
    const token = this.token;
    if (!token) {
      return throwError(() => new Error('Нет токена'));
    }
    return this.http.get<ProfileDTO>(`${this.backend}/profile`, { headers: { 'Authorization': token } }).pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError(() => err.error.message);
      })
    )
  }
}
