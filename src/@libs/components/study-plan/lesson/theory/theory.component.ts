import { Component, inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'theory',
  imports: [],
  templateUrl: './theory.component.html',
  styleUrl: './theory.component.scss'
})
export class TheoryComponent implements OnChanges {
  @Input() content: string = '';
  cachedSafeContent: SafeHtml = '';

  private sanitizer = inject(DomSanitizer);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['content']) {
      const processedContent = this.processContent(this.content);
      this.cachedSafeContent = this.sanitizer.bypassSecurityTrustHtml(processedContent);
    }
  }

  private processContent(content: string): string {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');

    const codeBlocks = doc.querySelectorAll('pre > code');
    codeBlocks.forEach(codeBlock => {
      const divs = codeBlock.querySelectorAll('div');
      divs.forEach(div => {
        const text = div.textContent || '';
        const hashIndex = text.indexOf('#');

        if (hashIndex !== -1) {
          const beforeHash = text.substring(0, hashIndex);
          const afterHash = text.substring(hashIndex);

          div.innerHTML = '';

          if (beforeHash) {
            div.appendChild(document.createTextNode(beforeHash));
          }

          const graySpan = document.createElement('span');
          graySpan.style.color = 'gray';
          graySpan.textContent = afterHash;
          div.appendChild(graySpan);
        }
      });
    });

    return doc.body.innerHTML;
  }
}
