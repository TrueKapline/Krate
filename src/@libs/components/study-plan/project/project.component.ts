import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { TheoryComponent } from '../lesson/theory/theory.component';
import { MonacoEditorComponent } from '../../krate-ui/monaco-editor/monaco-editor.component';
import { ActivatedRoute, Router } from '@angular/router';
import { StudyService } from '../../../services/study/study.service';
import { AuthService } from '../../../services/auth/auth.service';
import { KrateButtonComponent } from '../../krate-ui/krate-button/krate-button.component';
import { FormsModule } from '@angular/forms';
import { NgxSkeletonLoaderComponent } from 'ngx-skeleton-loader';

@Component({
  selector: 'app-project',
  imports: [
    TheoryComponent,
    MonacoEditorComponent,
    KrateButtonComponent,
    FormsModule,
    NgxSkeletonLoaderComponent
  ],
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss'
})
export class ProjectComponent implements OnInit {
  @Input() projectName: string = '';
  @Input() projectContent: string = '';
  @Input() projectSolution = signal('');

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private studyService = inject(StudyService);
  private authService = inject(AuthService);

  private userEmail = this.authService.userEmail();

  isProgramFailed: boolean | undefined = undefined;
  programErrors: string[] | undefined = undefined;

  isPending = true;

  ngOnInit() {
    this.route.params.subscribe(params => {
      const projectName = params['projectName'];

      this.studyService.getProject(this.userEmail!, projectName).subscribe({
        next: (response) => {
          this.projectName = response.title;
          this.projectContent = response.content;
          this.projectSolution.set(response.userSolution ? response.userSolution : '');
          this.isPending = false;
        }
      });
    });
  }

  goBack() {
    this.router.navigate(['/study-plan']).then();
  }

  onClick() {
    this.studyService.checkSolution(this.userEmail!, this.projectName, this.projectSolution()).subscribe({
      next: (response) => {
        if (response.result === 'correct') {
          this.isProgramFailed = false;
        } else {
          this.isProgramFailed = true;
          this.programErrors = response.errors;
        }
      }
    })
  }
}
