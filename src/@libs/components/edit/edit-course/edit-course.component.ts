import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EditService } from '../../../services/edit/edit.service';
import { KrateButtonComponent } from '../../krate-ui/krate-button/krate-button.component';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule, ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { ModalComponent } from '../../krate-ui/modal/modal.component';
import { KrateInputComponent } from '../../krate-ui/krate-input/krate-input.component';
import { KrateTextareaComponent } from '../../krate-ui/krate-textarea/krate-textarea.component';
import { KrateSelectComponent } from '../../krate-ui/krate-select/krate-select.component';
import { KrateProjectComponent } from '../../krate-ui/krate-project/krate-project.component';
import { LessonsDTO, ProjectsDTO } from '../../../services/edit/types/edit-course-dto.interface';
import { NgxSkeletonLoaderComponent } from 'ngx-skeleton-loader';
import { DraggableListComponent } from '../../krate-ui/draggable-list/draggable-list.component';

@Component({
  selector: 'app-edit-course',
  imports: [
    KrateButtonComponent,
    FormsModule,
    ModalComponent,
    ReactiveFormsModule,
    KrateInputComponent,
    KrateTextareaComponent,
    KrateSelectComponent,
    KrateProjectComponent,
    NgxSkeletonLoaderComponent,
    DraggableListComponent,
  ],
  templateUrl: './edit-course.component.html',
  styleUrl: './edit-course.component.scss'
})
export class EditCourseComponent implements OnInit {
  @Input() courseName!: string;
  @Input() courseDescription!: string;
  @Input() projects!: ProjectsDTO[] | null;
  @Input() lessons!: LessonsDTO[] | null;

  isModalOpen = false;
  modalType: 'name' | 'description' | 'project' | 'lesson' | 'delete' | null = null;
  modalHeading = '';

  difficultyOptions = [
    { value: 'easy', label: 'Простой' },
    { value: 'medium', label: 'Средний' },
    { value: 'hard', label: 'Сложный' }
  ]

  isSubmitted = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private editService: EditService,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const courseName = params['courseName'];

      this.editService.editCourse(courseName).subscribe({
        next: (response) => {
          this.courseName = response.name;
          this.courseDescription = response.description;
          this.projects = response.projects;
          this.lessons = response.lessons;
        }
      })
    });
  }

  onLessonsRearrange() {
    const titles = this.lessons?.map(item => item.title);
    if (titles) {
      this.editService.changeLessonsOrder(titles, this.courseName).subscribe();
    }
  }

  onModalClose() {
    this.isModalOpen = false;
    this.isSubmitted = false;
    this.editDescriptionForm.reset();
    this.editNameForm.reset();
    this.newProjectForm.reset();
    this.deleteCourseForm.reset();
  }

  openModal(modalType: 'name' | 'description' | 'project' | 'lesson' | 'delete') {
    this.modalType = modalType;
    switch (modalType) {
      case "name":
        this.modalHeading = 'Изменение названия';
        break;
      case "description":
        this.modalHeading = 'Изменение описания';
        break;
      case "project":
        this.modalHeading = 'Создание проекта';
        break;
      case "lesson":
        this.modalHeading = 'Создание урока';
        break;
      case 'delete':
        this.modalHeading = 'Удаление курса';
        break;
    }
    this.isModalOpen = !this.isModalOpen;
  }

  editNameForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(2)
    ]),
  });

  editDescriptionForm = new FormGroup({
    description: new FormControl(''),
  });

  newProjectForm = new FormGroup({
    projectName: new FormControl('', [
      Validators.required,
      Validators.minLength(2)
    ]),
    projectDesc: new FormControl(''),
    projectDiff: new FormControl('easy')
  });

  newLessonForm = new FormGroup({
    lessonName: new FormControl('', [
      Validators.required,
      Validators.minLength(2)
    ])
  });

  deleteCourseForm = new FormGroup({
    repeatName: new FormControl('', [
      this.nameValidator()
    ])
  });

  nameValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const isValid = control.value === this.courseName;
      return isValid ? null : { nameMismatch: true };
    }
  }

  get name() {
    return this.editNameForm.get('name')!;
  }

  get description() {
    return this.editDescriptionForm.get('description')!;
  }

  get projectName() {
    return this.newProjectForm.get('projectName')!;
  }

  get lessonName() {
    return this.newLessonForm.get('lessonName')!;
  }

  get repeatName() {
    return this.deleteCourseForm.get('repeatName')!;
  }

  onSubmit(type: 'name' | 'description' | 'project' | 'lesson' | 'delete' | null) {
    switch (type) {
      case ('name'): {
        this.isSubmitted = true;

        if (this.editNameForm.valid) {
          const { name } = this.editNameForm.value;

          this.editService.renameCourse(name!, this.courseName).subscribe({
            next: (response) => {
              this.courseName = response.name;
              this.isModalOpen = false;
            }
          });
        }
        break;
      }
      case ('description'): {
        if (this.editDescriptionForm.valid) {
          const { description } = this.editDescriptionForm.value;

          this.editService.changeCourseDescription(description!, this.courseName).subscribe({
            next: (response) => {
              this.courseDescription = response.description;
              this.isModalOpen = false;
            }
          });
        }
        break;
      }
      case ('project'): {
        this.isSubmitted = true;

        if (this.newProjectForm.valid) {
          const { projectName, projectDesc, projectDiff } = this.newProjectForm.value;

          this.editService.newProject(projectName!, projectDesc!, projectDiff!, this.courseName!).subscribe({
            next: (response) => {
              this.projects = response;
              this.isModalOpen = false;
            }
          });
        }
        break;
      }
      case ('lesson'): {
        this.isSubmitted = true;

        if (this.newLessonForm.valid) {
          const { lessonName } = this.newLessonForm.value;

          this.editService.newLesson(lessonName!, this.courseName!).subscribe({
            next: (response) => {
              this.lessons = response;
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

          this.editService.deleteCourse(repeatName!).subscribe({
            next: () => {
              this.isModalOpen = false;
              this.router.navigate(['/courses']).then();
            }
          });
        }
      }
    }
  }
}
