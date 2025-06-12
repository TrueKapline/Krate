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
          if (response.content) {
            const formatted = this.unformatPreCodeBlocks(response.content);
            this.content.set(formatted);
          } else {
            this.content.set('Начните писать здесь');
          }
        }
      });
    }
  }

  saveContent() {
    const formatted = this.formatPreCodeBlocks(this.content());

    this.editService.updateLessonContent(this.lessonName, this.courseName, formatted).subscribe();
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
}
