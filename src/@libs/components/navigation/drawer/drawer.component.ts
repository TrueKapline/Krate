import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'krate-drawer',
  imports: [
    NgStyle
  ],
  templateUrl: './drawer.component.html',
  styleUrl: './drawer.component.scss'
})
export class DrawerComponent {
  @Input() isOpen = false;
  @Input() width: number = 400;
  @Input() position: 'left' | 'right' = 'right';
  @Output() drawerClosed = new EventEmitter();

  get drawerStyles() {
    const commonStyles = { width: `${this.width}px`, };
    if (this.position === 'right') {
      return {
        ...commonStyles,
        right: this.isOpen ? '0' : `-${this.width}px`,
        'border-radius': '10px 0 0 0',
        'border-left': '2px solid var(--outline)',
      };
    } else {
      return {
        ...commonStyles,
        left: this.isOpen ? '0' : `-${this.width}px`,
        'border-radius': '0 10px 0 0',
        'border-right': '2px solid var(--outline)',
      };
    }
  }

  close() {
    this.drawerClosed.emit();
  }
}
