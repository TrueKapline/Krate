import { inject, Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { catchError, throwError } from 'rxjs';
import { GetCoursesDTO } from './types/get-courses-dto.interface';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);

  private readonly backend = environment.apiUrl;
  private readonly token = this.authService.token;

  getCourses() {
    if (!this.token) {
      return throwError(() => new Error('Нет токена'));
    }

    return this.http
      .get<GetCoursesDTO[]>(`${this.backend}/courses`, {
        headers: { 'Authorization': this.token }
      }).pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(() => err.error.message);
        })
      );
  }
}
