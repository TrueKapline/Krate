import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { environment } from '../../environment/environment';
import { catchError, throwError } from 'rxjs';
import { ProgressDTO } from './types/course-dto.interface';
import { LessonContentDTO } from './types/lesson-content-dto.interface';
import { ResultDTO } from './types/result-dto.interface';
import { ProjectContentDTO, TestResultDTO } from './types/project-content-dto.interface';

@Injectable({
  providedIn: 'root'
})
export class StudyService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);

  private readonly backend = environment.apiUrl;
  private readonly token = this.authService.token;

  selectCourse(email: string, courseName: string) {
    if (!this.token) {
      return throwError(() => new Error('Нет токена'));
    }

    return this.http
      .post(`${this.backend}/selectCourse`,
        { email, courseName },
        { headers: { 'Authorization': this.token } }
      ).pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(() => err.error.message);
        })
      );
  }

  getProgress(email: string) {
    if (!this.token) {
      return throwError(() => new Error('Нет токена'));
    }

    return this.http
      .get<ProgressDTO>(`${this.backend}/getProgress`, {
        params: { email },
        headers: { 'Authorization': this.token }
      }).pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(() => err.error.message);
        })
      );
  }

  selectProject(email: string, projectName: string) {
    if (!this.token) {
      return throwError(() => new Error('Нет токена'));
    }

    return this.http
      .post<ProgressDTO>(`${this.backend}/selectProject`,
        { email, projectName },
        { headers: { 'Authorization': this.token } }
      ).pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(() => err.error.message);
        })
      );
  }

  startLesson(email: string, lessonId: number) {
    if (!this.token) {
      return throwError(() => new Error('Нет токена'));
    }

    return this.http
      .post<ProgressDTO>(`${this.backend}/startLesson`,
        { email, lessonId },
        { headers: { 'Authorization': this.token } }
      ).pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(() => err.error.message);
        })
      );
  }

  getLesson(email: string, lessonName: string) {
    if (!this.token) {
      return throwError(() => new Error('Нет токена'));
    }

    return this.http
      .get<LessonContentDTO>(`${this.backend}/getLesson`, {
        params: { email, lessonName },
        headers: { 'Authorization': this.token }
      }).pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(() => err.error.message);
        })
      );
  }

  checkAnswer(email: string, title: string, question: string, selectedOptions: string[]) {
    if (!this.token) {
      return throwError(() => new Error('Нет токена'));
    }

    return this.http
      .post<ResultDTO>(`${this.backend}/checkAnswer`,
        { email, title, question, selectedOptions },
        { headers: { 'Authorization': this.token } }
      ).pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(() => err.error.message);
        })
      );
  }

  getProject(email: string, projectName: string) {
    if (!this.token) {
      return throwError(() => new Error('Нет токена'));
    }

    return this.http
      .get<ProjectContentDTO>(`${this.backend}/getProject`, {
        params: { email, projectName },
        headers: { 'Authorization': this.token }
      }).pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(() => err.error.message);
        })
      );
  }

  checkSolution(email: string, projectName: string, solution: string) {
    if (!this.token) {
      return throwError(() => new Error('Нет токена'));
    }

    return this.http
      .post<TestResultDTO>(`${this.backend}/checkSolution`,
        { email, projectName, solution },
        { headers: { 'Authorization': this.token } }
      ).pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(() => err.error.message);
        })
      );
  }
}
