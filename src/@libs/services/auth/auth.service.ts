import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environment/environment';
import { catchError, map, of, throwError } from 'rxjs';
import { RegisterDto } from './types/register-dto.interface';
import { WhoAmIDto } from './types/whoami-dto.interface';

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
    return this.http.post<RegisterDto>(`${this.backend}/register`, { email, password, username, role }).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 400) {
          return throwError(() => err.error.message);
        }
        return throwError(() => 'Ошибка регистрации');
      })
    );
  }

  login(email: string, password: string) {
    return this.http.post<RegisterDto>(`${this.backend}/login`, { email, password }).pipe(
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
    return this.http.get<WhoAmIDto>(`${this.backend}/whoAmI`, { headers: { 'Authorization': token } }).pipe(
        map(() => true),
        catchError(() => of(false))
      );
  }
}
