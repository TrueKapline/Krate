import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudyService } from '../../../services/study/study.service';
import { AuthService } from '../../../services/auth/auth.service';
import { LineSwitcherComponent } from '../../krate-ui/line-switcher/line-switcher.component';
import { TheoryComponent } from './theory/theory.component';
import { ExercisesComponent } from './exercises/exercises.component';
import { Exercises } from '../../../services/study/types/lesson-content-dto.interface';
import { KrateButtonComponent } from '../../krate-ui/krate-button/krate-button.component';
import { NgxSkeletonLoaderComponent } from 'ngx-skeleton-loader';

@Component({
  selector: 'app-lesson',
  imports: [
    LineSwitcherComponent,
    TheoryComponent,
    ExercisesComponent,
    KrateButtonComponent,
    NgxSkeletonLoaderComponent
  ],
  templateUrl: './lesson.component.html',
  styleUrl: './lesson.component.scss'
})
export class LessonComponent implements OnInit {
  @Input() lessonName: string = '';
  @Input() lessonContent: string = '';
  @Input() lessonExercises: Exercises[] = [];

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private studyService = inject(StudyService);
  private authService = inject(AuthService);

  private userEmail = this.authService.userEmail();

  isPending = true;

  switcherItems = ['Урок', 'Задания'];
  currentPage = signal<string>('Урок')

  ngOnInit() {
    this.route.params.subscribe(params => {
      const lessonName = params['lessonName'];

      this.studyService.getLesson(this.userEmail!, lessonName).subscribe({
        next: (response) => {
          this.lessonName = response.title;
          this.lessonContent = response.content;
          this.lessonExercises = response.exercises;
          this.isPending = false;
        }
      });
    });
  }

  goBack() {
    this.router.navigate(['/study-plan']).then();
  }

  onClick() {
    this.currentPage.set('Задания');
    window.scrollTo(0, 0);
  }
}
