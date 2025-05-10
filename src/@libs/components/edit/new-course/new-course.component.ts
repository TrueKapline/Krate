import { Component } from '@angular/core';
import { CardComponent } from '../../krate-ui/card/card.component';
import { KrateInputComponent } from '../../krate-ui/krate-input/krate-input.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { KrateButtonComponent } from '../../krate-ui/krate-button/krate-button.component';
import { KrateTextareaComponent } from '../../krate-ui/krate-textarea/krate-textarea.component';
import { EditService } from '../../../services/edit/edit.service';

@Component({
  selector: 'app-new-course',
  imports: [
    CardComponent,
    KrateInputComponent,
    ReactiveFormsModule,
    KrateButtonComponent,
    KrateTextareaComponent
  ],
  templateUrl: './new-course.component.html',
  styleUrl: './new-course.component.scss'
})
export class NewCourseComponent {
  protected isSubmitted = false;

  constructor(private editService: EditService) {
  }

  newCourseForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(2)
    ]),
    description: new FormControl(''),
  });

  get name() {
    return this.newCourseForm.get('name')!;
  }

  onSubmit() {
    this.isSubmitted = true;

    if (this.newCourseForm.valid) {
      const { name, description } = this.newCourseForm.value;

      this.editService.newCourse(name!, description!).subscribe({
        next: (response) => {
          console.log(response.name, response.description);
        }
      })
    }
  }
}
