import { Component, Input, OnChanges, signal } from '@angular/core';
import { KrateButtonComponent } from '../../../krate-ui/krate-button/krate-button.component';
import { ExerciseComponent, ExerciseOptions } from '../../../krate-ui/exercise/exercise.component';
import { ModalComponent } from '../../../krate-ui/modal/modal.component';
import { KrateSelectComponent } from '../../../krate-ui/krate-select/krate-select.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { EditService } from '../../../../services/edit/edit.service';
import { ExerciseDTO } from '../../../../services/edit/types/edit-course-dto.interface';

@Component({
  selector: 'edit-exercises',
  imports: [
    KrateButtonComponent,
    ExerciseComponent,
    ModalComponent,
    KrateSelectComponent,
    ReactiveFormsModule
  ],
  templateUrl: './edit-exercises.component.html',
  styleUrl: './edit-exercises.component.scss'
})
export class EditExercisesComponent implements OnChanges {
  @Input() lessonName = '';
  @Input() courseName = '';
  exercises = signal<ExerciseDTO[]>([]);

  isModalOpen = false;
  typeOptions = [
    { value: 'single', label: 'Одиночный выбор' },
    { value: 'multiple', label: 'Множественный выбор' }
  ];

  newExerciseForm = new FormGroup({
    exerciseType: new FormControl<'single' | 'multiple'>('single')
  });

  constructor(private editService: EditService) { }

  ngOnChanges() {
    if (this.lessonName && this.courseName) {
      this.editService.getExercises(this.lessonName, this.courseName).subscribe({
        next: (response) => {
          this.exercises.set(response);
          console.log(response);
        }
      });
    }
  }

  deleteExercise(index: number) {
    this.editService.deleteExercise(this.exercises()[index].id).subscribe({
      next: () => {
        this.exercises.update(exercises => exercises.filter((_, i) => i !== index));
      }
    });
  }

  saveExercise(options: ExerciseOptions) {
    const question = options.question;
    const id = options.groupId;

    const filtered = options.options
      .filter(item => item.isChecked);
    const correctAnswer = [
      ...filtered.map(item => item.value),
      ...(filtered.length === 0 ? [options.selectedOption ?? ''] : [])
    ];

    this.editService.saveExercise(question, id, options.options, correctAnswer).subscribe({
      next: (response) => {
        console.log(response);
      }
    });
  }

  openModal() {
    this.isModalOpen = true;
  }

  onModalClose() {
    this.isModalOpen = false;
  }

  private createExercise(exerciseType: 'single' | 'multiple') {
    const index = this.exercises().length;

    this.exercises.update(exercises => [
      ...exercises,
      {
        type: exerciseType,
        id: '',
        question: '',
        options: [],
      }
    ]);

    this.editService.newExercise(this.lessonName, this.courseName, exerciseType).subscribe({
      next: (response) => {
        this.exercises.update(exercises => {
          const updatedExercises = [...exercises];
          updatedExercises[index].id = response.id;
          return updatedExercises;
        });
      }
    });
  }

  onSubmit() {
    const type = this.newExerciseForm.value.exerciseType;
    if (type) {
      this.createExercise(type)
    }
    this.isModalOpen = false;
  }
}
