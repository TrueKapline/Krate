import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { CardComponent } from "../card/card.component";
import { KrateButtonComponent } from "../krate-button/krate-button.component";
import { AuthService } from '../../../services/auth/auth.service';
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
  @Input() name: string = '';
  @Input() description: string = '';
  @Input() difficulty: string = '';
  @Input() isPending: boolean = false;

  @Output() changeProject = new EventEmitter();
  @Output() openProject = new EventEmitter();

  private authService = inject(AuthService);

  role = this.authService.role;

  onProjectChange() {
    this.changeProject.emit(this.name);
  }

  onProjectOpen() {
    this.openProject.emit(this.name);
  }
}
