import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CardComponent } from "../card/card.component";
import { KrateButtonComponent } from "../krate-button/krate-button.component";
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
  @Input() isRedacting: boolean = false;

  @Output() changeProject = new EventEmitter();
  @Output() openProject = new EventEmitter();

  onProjectChange() {
    this.changeProject.emit(this.name);
  }

  onProjectOpen() {
    this.openProject.emit(this.name);
  }
}
