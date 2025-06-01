import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EditService } from '../../../services/edit/edit.service';
import { TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule, ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { LineSwitcherComponent } from '../../krate-ui/line-switcher/line-switcher.component';
import { EditTheoryComponent } from './edit-theory/edit-theory.component';
import { KrateButtonComponent } from '../../krate-ui/krate-button/krate-button.component';
import { ModalComponent } from '../../krate-ui/modal/modal.component';
import { KrateInputComponent } from '../../krate-ui/krate-input/krate-input.component';
import { EditExercisesComponent } from './edit-exercises/edit-exercises.component';

@Component({
  selector: 'app-edit-lesson',
  imports: [
    FormsModule,
    LineSwitcherComponent,
    EditTheoryComponent,
    KrateButtonComponent,
    ModalComponent,
    KrateInputComponent,
    ReactiveFormsModule,
    EditExercisesComponent
  ],
  providers: [
    { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' },
  ],
  templateUrl: './edit-lesson.component.html',
  styleUrl: './edit-lesson.component.scss'
})
export class EditLessonComponent implements OnInit {
  @Input() courseName: string = '';
  @Input() lessonName: string = '';

  switcherItems = ['Урок', 'Задания'];
  currentPage: 'Урок' | 'Задания' = 'Урок';

  isModalOpen = false;
  modalType: 'name' | 'delete' | null = null;
  modalHeading = '';

  isSubmitted = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private editService: EditService,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const lessonName = params['lessonName'];
      const courseName = params['courseName'];

      this.editService.editLesson(lessonName, courseName).subscribe({
        next: (response) => {
          this.lessonName = response.title;
          this.courseName = courseName;
        }
      })
    });
  }

  onSwitcherClick(item: 'Урок' | 'Задания') {
    this.currentPage = item
  }

  openModal(modalType: 'name' | 'delete') {
    this.modalType = modalType;
    switch (modalType) {
      case "name":
        this.modalHeading = 'Изменение названия';
        break;
      case 'delete':
        this.modalHeading = 'Удаление урока';
        break;
    }
    this.isModalOpen = !this.isModalOpen;
  }

  onModalClose() {
    this.isModalOpen = false;
    this.isSubmitted = false;
  }

  editNameForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(2)
    ]),
  });

  deleteCourseForm = new FormGroup({
    repeatName: new FormControl('', [
      this.nameValidator()
    ])
  });

  nameValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const isValid = control.value === this.lessonName;
      return isValid ? null : { nameMismatch: true };
    }
  }

  get name() {
    return this.editNameForm.get('name')!;
  }

  get repeatName() {
    return this.deleteCourseForm.get('repeatName')!;
  }

  onSubmit(type: 'name' | 'delete' | null) {
    switch (type) {
      case ('name'): {
        this.isSubmitted = true;

        if (this.editNameForm.valid) {
          const { name } = this.editNameForm.value;

          this.editService.renameLesson(this.lessonName, name!, this.courseName).subscribe({
            next: (response) => {
              this.lessonName = response.title;
              this.isModalOpen = false;
            }
          });
        }
        break;
      }
      case ('delete'): {
        this.isSubmitted = true;

        if (this.deleteCourseForm.valid) {
          const { repeatName } = this.deleteCourseForm.value;

          this.editService.deleteLesson(repeatName!, this.courseName).subscribe({
            next: () => {
              this.isModalOpen = false;
              this.router.navigate(['../..'], { relativeTo: this.route }).then();
            }
          });
        }
      }
    }
  }
}
