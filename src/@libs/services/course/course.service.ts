import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { catchError, throwError } from 'rxjs';
import { GetCoursesDTO } from './types/get-courses-dto.interface';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private readonly backend = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getCourses() {
    const token = this.authService.token;

    if (!token) {
      return throwError(() => new Error('Нет токена'));
    }

    return this.http
      .get<GetCoursesDTO[]>(`${this.backend}/courses`,
        { headers: { 'Authorization': token } }
      ).pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(() => err.error.message);
        })
      );
  }
}
