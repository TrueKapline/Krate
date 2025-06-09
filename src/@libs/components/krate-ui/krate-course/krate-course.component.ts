import { Component, inject, Input } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { KrateButtonComponent } from '../krate-button/krate-button.component';
import { PluralizePipe } from './model/plural-pipe';
import { NgxSkeletonLoaderComponent } from 'ngx-skeleton-loader';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';
import { StudyService } from '../../../services/study/study.service';

@Component({
  selector: 'krate-course',
  imports: [
    CardComponent,
    KrateButtonComponent,
    PluralizePipe,
    NgxSkeletonLoaderComponent,
  ],
  templateUrl: './krate-course.component.html',
  styleUrl: './krate-course.component.scss'
})
export class KrateCourseComponent {
  @Input() name: string = '';
  @Input() description: string = '';
  @Input() projects: number = 0;
  @Input() isPending: boolean = false;

  private authService = inject(AuthService);
  private router = inject(Router);
  private studyService = inject(StudyService);

  role = this.authService.role();
  userEmail = this.authService.userEmail();

  onRedactClick(courseName: string) {
    this.router.navigate(['/edit/course', courseName.toLowerCase()]).then();
  }

  onOpenClick(courseName: string) {
    this.studyService.selectCourse(this.userEmail!, courseName).subscribe({
      next: () => {
        this.router.navigate(['/study-plan']).then();
      }
    });
  }
}
