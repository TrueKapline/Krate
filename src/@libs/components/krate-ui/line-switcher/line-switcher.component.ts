import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'line-switcher',
  imports: [],
  templateUrl: './line-switcher.component.html',
  styleUrl: './line-switcher.component.scss'
})
export class LineSwitcherComponent {
  @Input() items: string[] = [];
  @Input() maxWidth?: number;

  @Output() selected = new EventEmitter();

  onClick(item: string) {
    this.selected.emit(item);
  }
}
