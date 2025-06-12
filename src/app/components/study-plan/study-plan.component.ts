import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { StudyService } from '../../../@libs/services/study/study.service';
import { AuthService } from '../../../@libs/services/auth/auth.service';
import { ProgressDTO } from '../../../@libs/services/study/types/course-dto.interface';
import { KrateProjectComponent } from '../../../@libs/components/krate-ui/krate-project/krate-project.component';
import { NgxSkeletonLoaderComponent } from 'ngx-skeleton-loader';
import {
  DraggableListComponent,
  ListItem
} from '../../../@libs/components/krate-ui/draggable-list/draggable-list.component';

@Component({
  selector: 'app-study-plan',
  imports: [
    KrateProjectComponent,
    NgxSkeletonLoaderComponent,
    DraggableListComponent
  ],
  templateUrl: './study-plan.component.html',
  styleUrl: './study-plan.component.scss'
})
export class StudyPlanComponent implements OnInit {
  @Input() course: string = '';
  @Input() lessons: ListItem[] = [];
  progress = signal<ProgressDTO | null>(null)

  isLoading: boolean = true;

  private router = inject(Router);
  private studyService = inject(StudyService);
  private authService = inject(AuthService);

  userEmail = this.authService.userEmail();

  ngOnInit() {
    this.studyService.getProgress(this.userEmail!).subscribe({
      next: (data) => {
        this.progress.set(data);

        if (data.progress?.lessons) {
          const lessonList = [...data.progress.lessons];
          lessonList.push({ title: 'Работа над проектом', order: lessonList.length + 1 });

          const completedCount = data.progress?.completedLessons?.length ?? 0;
          const nextOrder = completedCount + 1;

          this.lessons = lessonList.map(lesson => ({
            ...lesson,
            disabled: lesson.order > nextOrder
          }));
        }

        this.isLoading = false;
      }
    })
  }

  onProjectSelect(name: string) {
    this.studyService.selectProject(this.userEmail!, name).subscribe({
      next: (data) => {
        this.progress.set(data);
      }
    });
  }

  onLessonsClick(item: ListItem) {
    if (item.title !== 'Работа над проектом') {
      this.studyService.startLesson(this.userEmail!, item.id!).subscribe({
        next: () => {
          this.router.navigate(['study-plan/lesson', item.title.toLowerCase()]).then();
        }
      });
    } else {
      this.router.navigate(['study-plan/project', this.progress()?.progress?.currentProject.name]).then();
    }
  }

  onLinkClick() {
    this.router.navigate(['/courses']).then()
  }
}
