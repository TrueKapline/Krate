import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EditService } from '../../../services/edit/edit.service';
import { KrateButtonComponent } from '../../krate-ui/krate-button/krate-button.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModalComponent } from '../../krate-ui/modal/modal.component';
import { KrateInputComponent } from '../../krate-ui/krate-input/krate-input.component';
import { KrateTextareaComponent } from '../../krate-ui/krate-textarea/krate-textarea.component';
import { KrateSelectComponent } from '../../krate-ui/krate-select/krate-select.component';

@Component({
  selector: 'app-edit-course',
  imports: [
    KrateButtonComponent,
    FormsModule,
    ModalComponent,
    ReactiveFormsModule,
    KrateInputComponent,
    KrateTextareaComponent,
    KrateSelectComponent
  ],
  templateUrl: './edit-course.component.html',
  styleUrl: './edit-course.component.scss'
})
export class EditCourseComponent implements OnInit {
  @Input() courseName!: string;
  @Input() courseDescription!: string;

  isModalOpen = false;
  modalType: 'name' | 'description' | 'project' | null = null;
  modalHeading = '';

  difficultyOptions = [
    { value: 'easy', label: 'Простой' },
    { value: 'medium', label: 'Средний' },
    { value: 'hard', label: 'Сложный' }
  ]

  isSubmitted = false;

  constructor(
    private route: ActivatedRoute,
    private editService: EditService,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const courseName = params['courseName'];

      this.editService.editCourse(courseName).subscribe({
        next: (response) => {
          this.courseName = response.name;
          this.courseDescription = response.description;
        }
      })
    })
  }

  onModalClose() {
    this.isModalOpen = false;
    this.isSubmitted = false;
    this.editDescriptionForm.reset();
    this.editNameForm.reset();
    this.newProjectForm.reset();
  }

  openModal(modalType: 'name' | 'description' | 'project') {
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

  get name() {
    return this.editNameForm.get('name')!;
  }

  get description() {
    return this.editDescriptionForm.get('description')!;
  }

  get projectName() {
    return this.newProjectForm.get('projectName')!;
  }

  onSubmit(type: 'name' | 'description' | 'project' | null) {
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
          })
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
          })
        }
        break;
      }
      case ('project'): {
        this.isSubmitted = true;

        if (this.newProjectForm.valid) {
          const { projectName, projectDesc, projectDiff } = this.newProjectForm.value;

          this.editService.newProject(projectName!, projectDesc!, projectDiff!, this.courseName!).subscribe({
            next: (response) => {
              console.log(response.name, response.description, response.difficulty);
              this.isModalOpen = false;
            }
          })
        }
        break;
      }
    }
  }
}
