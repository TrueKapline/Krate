import { inject, Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { catchError, throwError } from 'rxjs';
import { NewCourseDTO } from './types/new-course-dto.interface';
import {
  EditedCourseDTO,
  ExerciseDTO,
  LessonContentDTO,
  LessonsDTO,
  ProjectsDTO
} from './types/edit-course-dto.interface';
import { RenameCourseDTO } from './types/rename-course-dto.interface';
import { ChangeCourseDescDTO } from './types/change-course-desc-dto.interface';

@Injectable({
  providedIn: 'root'
})
export class EditService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);

  private readonly backend = environment.apiUrl;
  private readonly token = this.authService.token;

  newCourse(name: string, description: string = '') {
    if (!this.token) {
      return throwError(() => new Error('Нет токена'));
    }

    return this.http
      .post<NewCourseDTO>(`${this.backend}/newCourse`,
        { name, description },
        { headers: { 'Authorization': this.token } }
      ).pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(() => err.error.message);
        })
      );
  }

  editCourse(name: string) {
    if (!this.token) {
      return throwError(() => new Error('Нет токена'));
    }

    return this.http
      .get<EditedCourseDTO>(`${this.backend}/editedCourse`, {
        params: { name },
        headers: { 'Authorization': this.token }
      }).pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(() => err.error.message);
        })
      );
  }

  renameCourse(newName: string, oldName: string) {
    if (!this.token) {
      return throwError(() => new Error('Нет токена'));
    }

    return this.http
      .post<RenameCourseDTO>(`${this.backend}/renameCourse`,
        { newName, oldName },
        { headers: { 'Authorization': this.token } }
      ).pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(() => err.error.message);
        })
      );
  }

  changeCourseDescription(description: string, courseName: string) {
    if (!this.token) {
      return throwError(() => new Error('Нет токена'));
    }

    return this.http
      .post<ChangeCourseDescDTO>(`${this.backend}/changeCourseDescription`,
        { description, courseName },
        { headers: { 'Authorization': this.token } }
      ).pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(() => err.error.message);
        })
      );
  }

  newProject(name: string, description: string = '', difficulty: string, course: string) {
    if (!this.token) {
      return throwError(() => new Error('Нет токена'));
    }

    return this.http
      .post<ProjectsDTO[]>(`${this.backend}/newProject`,
        { name, description, difficulty, course },
        { headers: { 'Authorization': this.token } }
      ).pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(() => err.error.message);
        })
      );
  }

  newLesson(title: string, course: string) {
    if (!this.token) {
      return throwError(() => new Error('Нет токена'));
    }

    return this.http
      .post<LessonsDTO>(`${this.backend}/newLesson`,
        { title, course },
        { headers: { 'Authorization': this.token } }
      ).pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(() => err.error.message);
        })
      );
  }

  changeLessonsOrder(lessons: string[], course: string) {
    if (!this.token) {
      return throwError(() => new Error('Нет токена'));
    }

    return this.http
      .post(`${this.backend}/changeLessonsOrder`,
        { lessons, course },
        { headers: { 'Authorization': this.token } }
      ).pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(() => err.error.message);
        })
      );
  }

  deleteCourse(name: string) {
    if (!this.token) {
      return throwError(() => new Error('Нет токена'));
    }

    return this.http
      .post(`${this.backend}/deleteCourse`,
        { name },
        { headers: { 'Authorization': this.token } }
      ).pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(() => err.error.message);
        })
      );
  }

  editLesson(lessonName: string, courseName: string) {
    if (!this.token) {
      return throwError(() => new Error('Нет токена'));
    }

    return this.http
      .get<LessonsDTO>(`${this.backend}/editedLesson`, {
        params: { lessonName, courseName },
        headers: { 'Authorization': this.token }
      }).pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(() => err.error.message);
        })
      );
  }

  renameLesson(lessonName: string, newLessonName: string, courseName: string) {
    if (!this.token) {
      return throwError(() => new Error('Нет токена'));
    }

    return this.http
      .post<LessonsDTO>(`${this.backend}/renameLesson`,
        { lessonName, newLessonName, courseName },
        { headers: { 'Authorization': this.token } }
      ).pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(() => err.error.message);
        })
      );
  }

  deleteLesson(lessonName: string, courseName: string) {
    if (!this.token) {
      return throwError(() => new Error('Нет токена'));
    }

    return this.http
      .post(`${this.backend}/deleteLesson`,
        { lessonName, courseName },
        { headers: { 'Authorization': this.token } }
      ).pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(() => err.error.message);
        })
      );
  }

  getLessonContent(lessonName: string, courseName: string) {
    if (!this.token) {
      return throwError(() => new Error('Нет токена'));
    }

    return this.http
      .get<LessonContentDTO>(`${this.backend}/getLessonContent`, {
        params: { lessonName, courseName },
        headers: { 'Authorization': this.token }
      }).pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(() => err.error.message);
        })
      );
  }

  updateLessonContent(lessonName: string, courseName: string, content: string) {
    if (!this.token) {
      return throwError(() => new Error('Нет токена'));
    }

    return this.http
      .post<LessonContentDTO>(`${this.backend}/updateLessonContent`,
        { lessonName, courseName, content },
        { headers: { 'Authorization': this.token } }
      ).pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(() => err.error.message);
        })
      );
  }

  newExercise(lessonName: string, courseName: string, exerciseType: string) {
    if (!this.token) {
      return throwError(() => new Error('Нет токена'));
    }

    return this.http
      .post<ExerciseDTO>(`${this.backend}/newExercise`,
        { lessonName, courseName, exerciseType },
        { headers: { 'Authorization': this.token } }
      ).pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(() => err.error.message);
        })
      );
  }

  getExercises(lessonName: string, courseName: string) {
    if (!this.token) {
      return throwError(() => new Error('Нет токена'));
    }

    return this.http
      .get<ExerciseDTO[]>(`${this.backend}/getExercises`, {
        params: { lessonName, courseName },
        headers: { 'Authorization': this.token }
      }).pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(() => err.error.message);
        })
      );
  }

  deleteExercise(exerciseId: string) {
    if (!this.token) {
      return throwError(() => new Error('Нет токена'));
    }

    return this.http
      .post<ExerciseDTO>(`${this.backend}/deleteExercise`,
        { exerciseId },
        { headers: { 'Authorization': this.token } }
      ).pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(() => err.error.message);
        })
      );
  }

  saveExercise(
    question: string,
    exerciseId: string,
    options: { value: string, userInput: string }[],
    correctAnswer: string[]
  ) {
    if (!this.token) {
      return throwError(() => new Error('Нет токена'));
    }

    return this.http
      .post<ExerciseDTO>(`${this.backend}/saveExercise`,
        { question, exerciseId, options, correctAnswer },
        { headers: { 'Authorization': this.token } }
      ).pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(() => err.error.message);
        })
      );
  }
}
