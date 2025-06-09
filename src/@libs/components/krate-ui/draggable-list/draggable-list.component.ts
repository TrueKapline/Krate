import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CdkDrag, CdkDragDrop, CdkDragHandle, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';

export interface ListItem {
  id?: number;
  order: number;
  title: string;
  disabled?: boolean;
}

@Component({
  selector: 'draggable-list',
  imports: [CdkDrag, CdkDropList, CdkDragHandle],
  templateUrl: './draggable-list.component.html',
  styleUrl: './draggable-list.component.scss'
})
export class DraggableListComponent {
  @Input() items: ListItem[] = [];
  @Input() withNumbers: boolean = true;
  @Input() withButton: boolean = true;
  @Input() draggable: boolean = true;

  @Output() rearrange = new EventEmitter();
  @Output() buttonClick = new EventEmitter();

  drop(event: CdkDragDrop<ListItem[]>) {
    moveItemInArray(this.items, event.previousIndex, event.currentIndex);
    this.updateOrders();
  }

  onClick(item: ListItem) {
    this.buttonClick.emit(item);
  }

  private updateOrders() {
    this.items.forEach((item, index) => {
      item.order = index + 1;
    });
    this.rearrange.emit();
  }
}
