import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTheoryComponent } from './edit-theory.component';

describe('EditTheoryComponent', () => {
  let component: EditTheoryComponent;
  let fixture: ComponentFixture<EditTheoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditTheoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditTheoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
