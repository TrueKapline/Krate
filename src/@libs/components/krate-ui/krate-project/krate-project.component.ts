import { Component, inject, Input } from '@angular/core';
import { CardComponent } from "../card/card.component";
import { KrateButtonComponent } from "../krate-button/krate-button.component";
import { AuthService } from '../../../services/auth/auth.service';
// import { Router } from '@angular/router';
import { NgxSkeletonLoaderComponent } from 'ngx-skeleton-loader';

@Component({
  selector: 'krate-project',
  imports: [
    CardComponent,
    KrateButtonComponent,
    NgxSkeletonLoaderComponent,
  ],
  templateUrl: './krate-project.component.html',
  styleUrl: './krate-project.component.scss'
})
export class KrateProjectComponent {
  @Input() name!: string;
  @Input() description!: string;
  @Input() difficulty!: string;
  @Input() isPending!: boolean;

  private authService = inject(AuthService);
  // private router = inject(Router);

  role = this.authService.role;

  // onProjectSelected(courseName: string) {
  //   this.router.navigate(['/edit/course', courseName.toLowerCase()]).then();
  // }
}
