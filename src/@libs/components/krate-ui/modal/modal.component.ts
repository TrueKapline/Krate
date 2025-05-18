import { Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent implements OnChanges {
  @Input() isOpen = false;
  @Input() title = '';
  @Input() closeOnOverlayClick = true;
  @Output() closed = new EventEmitter<void>();

  @ViewChild('modalContent') modalContent!: ElementRef<HTMLElement>;

  private previousActiveElement: HTMLElement | null = null;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isOpen']) {
      this.handleAccessibility();
    }
  }

  close() {
    this.isOpen = false;
    this.closed.emit();
  }

  handleOverlayClick(event: MouseEvent) {
    if (this.closeOnOverlayClick &&
      event.target === event.currentTarget) {
      this.close();
    }
  }

  private handleAccessibility() {
    if (this.isOpen) {
      this.previousActiveElement = document.activeElement as HTMLElement;
      setTimeout(() => {
        const focusable = this.modalContent.nativeElement
          .querySelector<HTMLElement>('[autofocus], button, input, textarea');
        focusable?.focus();
      }, 0);
    } else {
      this.previousActiveElement?.focus();
    }
  }
}
