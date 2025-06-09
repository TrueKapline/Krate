import { Component, inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudyService } from '../../../services/study/study.service';
import { AuthService } from '../../../services/auth/auth.service';
import { LineSwitcherComponent } from '../../krate-ui/line-switcher/line-switcher.component';
import { TheoryComponent } from './theory/theory.component';
import { ExercisesComponent } from './exercises/exercises.component';
import { Exercises } from '../../../services/study/types/lesson-content-dto.interface';

@Component({
  selector: 'app-lesson',
  imports: [
    LineSwitcherComponent,
    TheoryComponent,
    ExercisesComponent
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

  switcherItems = ['Урок', 'Задания'];
  currentPage: 'Урок' | 'Задания' = 'Урок';

  ngOnInit() {
    this.route.params.subscribe(params => {
      const lessonName = params['lessonName'];

      this.studyService.getLesson(this.userEmail!, lessonName).subscribe({
        next: (response) => {
          this.lessonName = response.title;
          this.lessonContent = response.content;
          this.lessonExercises = response.exercises;
          console.log(response);
        }
      });
    });
  }

  onSwitcherClick(item: 'Урок' | 'Задания') {
    this.currentPage = item
  }

  goBack() {
    this.router.navigate(['/study-plan']).then();
  }
}
