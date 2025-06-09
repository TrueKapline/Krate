import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'list',
  imports: [
    FormsModule
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnChanges {
  @Input() items: string[] = [];
  @Input() selectedItems: string | string[] | null = null;
  @Input() type: 'radio' | 'checkbox' = 'radio';

  @Output() onSelect = new EventEmitter();

  groupName: string = '';
  checkedItems: { [key: string]: boolean } = {};

  ngOnChanges(changes: SimpleChanges): void {
    this.groupName = `list-${Date.now()}`;
    if (changes['items'] || changes['selectedValues'] || changes['type']) {
      this.initializeCheckedItems();
    }
  }

  private initializeCheckedItems(): void {
    const newCheckedItems: { [key: string]: boolean } = {};

    this.items.forEach(item => {
      newCheckedItems[item] = false;
    });

    if (this.selectedItems !== null && this.selectedItems !== undefined) {
      if (this.type === 'radio' && typeof this.selectedItems === 'string') {
        if (this.items.includes(this.selectedItems)) {
          newCheckedItems[this.selectedItems] = true;
        }
      } else if (this.type === 'checkbox' && Array.isArray(this.selectedItems)) {
        this.selectedItems.forEach(item => {
          if (this.items.includes(item)) {
            newCheckedItems[item] = true;
          }
        });
      }
    }

    this.checkedItems = newCheckedItems;
  }

  onRadioChange(item: string) {
    this.onSelect.emit({
      items: this.items,
      selectedItem: item,
    });
  }

  onCheckboxChange() {
    const selectedItems = this.items.filter(item => this.checkedItems[item]);
    this.onSelect.emit({
      items: this.items,
      selectedItems: selectedItems,
    });
  }
}
