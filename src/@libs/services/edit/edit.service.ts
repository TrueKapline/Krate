import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { catchError, throwError } from 'rxjs';
import { CourseDTO } from './types/course-dto.interface';

@Injectable({
  providedIn: 'root'
})
export class EditService {
  private readonly backend = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  newCourse(name: string, description: string = '') {
    const token = this.authService.token;

    if (!token) {
      return throwError(() => new Error('Нет токена'));
    }

    return this.http
      .post<CourseDTO>(`${this.backend}/newCourse`,
        { name, description },
        { headers: { 'Authorization': token } }
      ).pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(() => err.error.message);
        })
      );
  }
}
