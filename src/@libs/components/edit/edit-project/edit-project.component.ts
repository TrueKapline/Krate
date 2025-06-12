import { Component, Input, OnInit, signal } from '@angular/core';
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
import { KrateInputComponent } from '../../krate-ui/krate-input/krate-input.component';
import { ModalComponent } from '../../krate-ui/modal/modal.component';
import { ActivatedRoute, Router } from '@angular/router';
import { EditService } from '../../../services/edit/edit.service';
import { KrateTextareaComponent } from '../../krate-ui/krate-textarea/krate-textarea.component';
import { EditorComponent, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
import { tinymceConfig } from '../../../environment/tinymce-config';
import { ListComponent } from '../../krate-ui/list/list.component';
import { MonacoEditorComponent } from '../../krate-ui/monaco-editor/monaco-editor.component';

@Component({
  selector: 'app-edit-project',
  imports: [
    KrateButtonComponent,
    FormsModule,
    KrateInputComponent,
    ModalComponent,
    ReactiveFormsModule,
    KrateTextareaComponent,
    EditorComponent,
    ListComponent,
    MonacoEditorComponent,
  ],
  providers: [
    { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' }
  ],
  templateUrl: './edit-project.component.html',
  styleUrl: './edit-project.component.scss'
})
export class EditProjectComponent implements OnInit {
  @Input() projectName: string = '';
  @Input() courseName: string = '';
  @Input() projectDescription: string = '';
  @Input() lessonsList: string[] = [];
  @Input() activeList: string[] = [];
  @Input() projectTask = signal('');
  @Input() projectTest = signal('');

  selectedLessons: string[] = [];

  isModalOpen = false;
  modalType: 'name' | 'description' | 'delete' | null = null;
  modalHeading = '';

  isSubmitted = false;

  editorConfig = tinymceConfig;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private editService: EditService,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const projectName = params['projectName'];
      const courseName = params['courseName'];

      this.editService.getEditedProject(projectName, courseName).subscribe({
        next: (response) => {
          this.projectName = response.name;
          this.projectDescription = response.description;
          this.courseName = courseName;

          if (response.task) {
            const formatted = this.unformatPreCodeBlocks(response.task);
            this.projectTask.set(formatted);
          } else {
            this.projectTask.set('Начните писать здесь');
          }

          this.projectTest.set(response.test ? response.test : '# Напишите тест\n');
        }
      });

      this.editService.getLessons(courseName, projectName).subscribe({
        next: (response) => {
          this.lessonsList = response.lessons.map(item => item.title);
          this.activeList = response.selectedLessons.map(item => item.title);
        }
      });
    });
  }

  onModalClose() {
    this.isModalOpen = false;
    this.isSubmitted = false;
    this.editDescriptionForm.reset();
    this.editNameForm.reset();
    this.deleteProjectForm.reset();
  }

  openModal(modalType: 'name' | 'description' | 'delete') {
    this.modalType = modalType;
    switch (modalType) {
      case "name":
        this.modalHeading = 'Изменение названия';
        break;
      case "description":
        this.modalHeading = 'Изменение описания';
        break;
      case 'delete':
        this.modalHeading = 'Удаление проекта';
        break;
    }
    this.isModalOpen = !this.isModalOpen;
  }

  editNameForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(2)
    ]),
  })

  editDescriptionForm = new FormGroup({
    description: new FormControl(''),
  })

  deleteProjectForm = new FormGroup({
    repeatName: new FormControl('', [
      this.nameValidator()
    ])
  })

  nameValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const isValid = control.value === this.projectName;
      return isValid ? null : { nameMismatch: true };
    }
  }

  get name() {
    return this.editNameForm.get('name')!;
  }

  get description() {
    return this.editDescriptionForm.get('description')!;
  }

  get repeatName() {
    return this.deleteProjectForm.get('repeatName')!;
  }

  onSubmit(type: 'name' | 'description' | 'delete' | null) {
    switch (type) {
      case ('name'): {
        this.isSubmitted = true;

        if (this.editNameForm.valid) {
          const { name } = this.editNameForm.value;

          this.editService.renameProject(this.projectName, name!, this.courseName).subscribe({
            next: (response) => {
              this.projectName = response.name;
              this.isModalOpen = false;
            }
          });
        }
        break;
      }
      case ('description'): {
        if (this.editDescriptionForm.valid) {
          const { description } = this.editDescriptionForm.value;

          this.editService.changeProjectDescription(description!, this.projectName, this.courseName).subscribe({
            next: (response) => {
              this.projectDescription = response.description;
              this.isModalOpen = false;
            }
          });
        }
        break;
      }
      case ('delete'): {
        this.isSubmitted = true;

        if (this.deleteProjectForm.valid) {
          const { repeatName } = this.deleteProjectForm.value;

          this.editService.deleteProject(repeatName!, this.courseName).subscribe({
            next: () => {
              this.isModalOpen = false;
              this.router.navigate(['../..'], { relativeTo: this.route }).then();
            }
          });
        }
      }
    }
  }

  saveTask() {
    const formatted = this.formatPreCodeBlocks(this.projectTask());

    this.editService.updateProjectTask(this.projectName, this.courseName, formatted).subscribe();
  }

  formatPreCodeBlocks(rawHtml: string): string {
    return rawHtml.replace(
      /<pre class="language-python"><code>([\s\S]*?)<\/code><\/pre>/g,
      (match: string, codeContent: string): string => {
        const lines = codeContent.split('\n');
        const wrappedLines = lines.map((line: string) => `<div>${line}</div>`).join('');
        return `<pre><code>${wrappedLines}</code></pre>`;
      }
    );
  }

  unformatPreCodeBlocks(formattedHtml: string): string {
    return formattedHtml.replace(
      /<pre><code>([\s\S]*?)<\/code><\/pre>/g,
      (match: string, codeContent: string): string => {
        const lines = Array.from(codeContent.matchAll(/<div>(.*?)<\/div>/g), m => m[1]);
        const joined = lines.join('\n');
        return `<pre class="language-python"><code>${joined}</code></pre>`;
      }
    );
  }

  itemSelect(item: { items: string[], selectedItems: string[] }) {
    this.selectedLessons = item.selectedItems;
  }

  saveLessons() {
    this.editService.updateProjectLessons(this.projectName, this.courseName, this.selectedLessons).subscribe();
  }

  saveTest() {
    this.editService.updateProjectTest(this.projectName, this.courseName, this.projectTest()).subscribe();
  }
}
