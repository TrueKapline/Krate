import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DraggableListComponent } from './draggable-list.component';

describe('DraggableListComponent', () => {
  let component: DraggableListComponent;
  let fixture: ComponentFixture<DraggableListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DraggableListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DraggableListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
