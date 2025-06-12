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
  @Input() checkedItem: string = '';

  @Output() checkedItemChange = new EventEmitter<string>();

  onChange(item: string) {
    this.checkedItem = item;
    this.checkedItemChange.emit(item);
  }
}
