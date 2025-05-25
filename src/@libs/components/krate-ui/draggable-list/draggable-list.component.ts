import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CdkDrag, CdkDragDrop, CdkDragHandle, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';

interface ListItem {
  order: number;
  title: string;
}

@Component({
  selector: 'draggable-list',
  imports: [CdkDrag, CdkDropList, CdkDragHandle],
  templateUrl: './draggable-list.component.html',
  styleUrl: './draggable-list.component.scss'
})
export class DraggableListComponent {
  @Input() items!: ListItem[];
  @Input() withNumbers: boolean = true;
  @Input() withButton: boolean = true;

  @Output() rearrange = new EventEmitter();
  @Output() buttonClick = new EventEmitter();

  drop(event: CdkDragDrop<ListItem[]>) {
    moveItemInArray(this.items, event.previousIndex, event.currentIndex);
    this.updateOrders();
  }

  onClick() {
    this.buttonClick.emit()
  }

  private updateOrders() {
    this.items.forEach((item, index) => {
      item.order = index + 1;
    });
    this.rearrange.emit();
  }
}
