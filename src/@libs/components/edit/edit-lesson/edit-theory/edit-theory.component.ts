import { Component, Input, OnChanges, signal } from '@angular/core';
import { EditorComponent } from '@tinymce/tinymce-angular';
import { KrateButtonComponent } from '../../../krate-ui/krate-button/krate-button.component';
import { FormsModule } from '@angular/forms';
import { EditService } from '../../../../services/edit/edit.service';
import { tinymceConfig } from '../../../../environment/tinymce-config';

@Component({
  selector: 'edit-theory',
  imports: [
    EditorComponent,
    KrateButtonComponent,
    FormsModule
  ],
  templateUrl: './edit-theory.component.html',
  styleUrl: './edit-theory.component.scss'
})
export class EditTheoryComponent implements OnChanges {
  @Input() courseName: string = '';
  @Input() lessonName: string = '';
  @Input() content = signal('');

  editorConfig = tinymceConfig;

  constructor(
    private editService: EditService,
  ) { }

  ngOnChanges(): void {
    if (this.lessonName && this.courseName) {
      this.editService.getLessonContent(this.lessonName, this.courseName).subscribe({
        next: (response) => {
          this.content.set(response.content ? response.content : 'Начните писать здесь');
        }
      });
    }
  }

  saveContent() {
    this.editService.updateLessonContent(this.lessonName, this.courseName, this.content()).subscribe({
      next: (response) => {
        console.log(response.content);
      }
    });
  }
}
