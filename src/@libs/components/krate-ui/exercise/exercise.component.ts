import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { KrateButtonComponent } from '../krate-button/krate-button.component';
import { ModalComponent } from '../modal/modal.component';

export interface ExerciseOptions {
  question: string,
  options: { value: string, userInput: string, isChecked: boolean }[];
  groupId: string;
  selectedOption?: string;
}

@Component({
  selector: 'exercise',
  imports: [
    CardComponent,
    FormsModule,
    KrateButtonComponent,
    ModalComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './exercise.component.html',
  styleUrl: './exercise.component.scss'
})
export class ExerciseComponent implements OnInit {
  @Input() type: 'single' | 'multiple' = 'single';
  @Input() options: { value: string, userInput: string, isChecked: boolean }[] = [];
  @Input() groupId: string = '';
  @Input() question: string = '';
  @Input() selectedOption?: string = '';

  @Output() onSave = new EventEmitter<ExerciseOptions>();
  @Output() onDelete = new EventEmitter();

  isRedacting = false;

  isModalOpen = false;

  ngOnInit() {
    if (!this.groupId) {
      this.groupId = `${Date.now()}`;
    }
  }

  addOption() {
    const newOption = {
      value: `Option ${Date.now()}`,
      userInput: '',
      isChecked: false
    };
    this.options.push(newOption);
  }

  deleteOption(value: object) {
    this.options = this.options.filter(item => item !== value);
  }

  redact() {
    this.isRedacting = true;
  }

  save() {
    this.isRedacting = false;
    if (this.type === 'single') {
      this.onSave.emit({
        question: this.question,
        options: this.options,
        groupId: this.groupId,
        selectedOption: this.selectedOption
      });
    } else {
      this.onSave.emit({question: this.question, options: this.options, groupId: this.groupId });
    }
  }

  deleteExercise() {
    this.onDelete.emit();
    this.isModalOpen = false;
  }

  openModal() {
    this.isModalOpen = true;
  }

  onModalClose() {
    this.isModalOpen = false;
  }
}
